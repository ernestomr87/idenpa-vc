const axios = require('axios');

const API = 'http://192.168.0.10:3001';
// const API = 'http://localhost:3001';

const fetchAgroproductividad = () => {
	return axios.get(`${API}/api/afectaciones/agroproductividad`);
};

const fetchInfrastructure = (gid) => {
	return axios.get(`${API}/api/infrastructure/${gid}`);
};

export default API;
export { fetchAgroproductividad, fetchInfrastructure };
