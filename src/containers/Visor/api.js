import axios from 'axios';

export const loadNode = (nodeUrl) => {
	return axios.get(nodeUrl, { timeout: 10000 });
};
