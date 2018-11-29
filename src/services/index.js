const axios = require('axios');

const API = 'http://geoweb.enpa.vcl.minag.cu';
//const API = 'http://localhost:3001';

const fetchAgroproductividad = () => {
	return axios.get(`${API}/api/afectaciones/agroproductividad`);
};
const fetchAgroproductividadByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/agroproductividadByMun/${mun}`);
};

const fetchInfrastructure = (gid) => {
	return axios.get(`${API}/api/infrastructure/${gid}`);
};

export default API;
export { fetchAgroproductividad, fetchInfrastructure, fetchAgroproductividadByMun };
