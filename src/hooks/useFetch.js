import axios from "axios";
import {useState} from "react";
// import ApiRoutes from "../config/ApiRoutes";

const apiInstance = axios.create(/*{
    baseURL: ApiRoutes.BASE_URL
}*/);

const useFetch = (axiosParams) => {


    const [response, setResponse] = useState({
        data: null, loading: false, error: null,
    });


    const sendRequest = async (newParams) => {
        try {
            setResponse({data: null, loading: true, error: null})
            let result = await apiInstance.request(newParams ?? axiosParams);
            setResponse({data: result.data, loading: false, error: null});
            return result.data
        } catch (e) {
            let message = e.response.data.status.message ? e.response.data.status.message : 'Connection fails :(';
            setResponse({data: null, loading: false, error: message});
            return Promise.reject(message)
        }
    };
    return [sendRequest, response, setResponse];
};

export default useFetch;
