import axios from 'axios';

const newRequest = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    withCredentials: true,
});

export default newRequest;
