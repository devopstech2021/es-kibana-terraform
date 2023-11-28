import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded';

const HttpClient = axios.create();


const handleErrorResponse = (responseMessage: string) => {
  //handle error with error message;
}

// HTTP interceptor for response
axios.interceptors.response.use((response: any) => {
  // handle success responses
  if (response.data) {
    return Promise.resolve(response.data);
  } else if (response.status === 200) {
    return Promise.resolve(response.status);
  }
  else {
    return Promise.reject(response.message);
  }
}, error => {
  // handle error responses
  if (error.response) {
    switch (error.response.status) {
      case 401:
        handleErrorResponse("handle unauthorized responses");
        break;
      case 403:
        handleErrorResponse("handle forbidden responses");
        break;
      case 404:
        handleErrorResponse("handle not found responses");
        break;
      case 500:
        handleErrorResponse("handle server error responses");
        break;
      default:
        handleErrorResponse("handle other error responses");
        break;
    }
  }
  return Promise.reject(error);
}
);

export default HttpClient;
