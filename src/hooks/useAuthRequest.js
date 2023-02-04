import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config/Url";


const apiInstance = axios.create({
    baseURL: BASE_URL
});

apiInstance.interceptors.request.use(
    async (req) => {
        const token = localStorage.getItem('token')

        req.headers = {
            Authorization: `Bearer ${token}`
        };
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const useAuthRequest = (axiosParams) => {
    const [response, setResponse] = useState({
        data: null,
        loading: false,
        error: null
    });

    const sendRequest = async (newParams) => {
            try {
                setResponse({data: null, loading: true, error: null})
                const result = await apiInstance.request(newParams ?? axiosParams);

                setResponse({data: result.data, loading: false, error: null});
                return result.data
            } catch (e) {
                let message = e.response.data.status.message ? e.response.data.status.message : "Connection fails :(";
                let code = e.response.data.status.code ? e.response.data.status.code : 500;

                setResponse({
                    data: null,
                    loading: false,
                    error: message
                });

                return Promise.reject({message, code})
            }
        }
    ;
    return [sendRequest, response, setResponse];
};

export default useAuthRequest;
