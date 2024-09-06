import ax from 'axios';
import env from "../config"

const axios = ax.create({
    baseURL: env.baseUrl
});

export default axios;