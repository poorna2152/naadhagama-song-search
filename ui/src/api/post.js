import axios from './axios';

export const postRequest = async (url, data) => {
	try {
		let response = await axios.post(url, data);
		return {
            data: response.data.hits,
            message: response.data.message,
        }
	} catch (error) {
		return {
			error: error,
			message: error.message
		};
	}
};
