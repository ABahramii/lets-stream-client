import axios from "axios";
import {useState} from "react";
import {BASE_URL} from "../config/Url";

const apiInstance = axios.create({
    baseURL: BASE_URL
});

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
            let message = e.response.data.status.message ? e.response.data.status.message : "An Error Occurred.";
            setResponse({data: null, loading: false, error: message});
            return Promise.reject(message)
        }
    };
    return [sendRequest, response, setResponse];
};

export default useFetch;
