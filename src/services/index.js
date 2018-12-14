const axios = require('axios');

//const API = 'http://geoweb.enpa.vcl.minag.cu';
const API = 'http://localhost:3001';

const fetchAgroproductividad = () => {
	return axios.get(`${API}/api/afectaciones/agroproductividad`);
};

const fetchAgroproductividadByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/agroproductividad/${mun}`);
};

const fetchInfrastructure = (gid) => {
	return axios.get(`${API}/api/infrastructure/${gid}`);
};

//////////////////////////////////////////////////////////// Las consultas que stoy haciendo yo

const fetchParcelasAfectadas = () => {
	return axios.get(`${API}/api/afectaciones/parcelasAfectadas`);
};

const fetchParcelasAfectadasByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/parcelasAfectadas/${mun}`);
};

//////////////////////////////////////////////////////////// Las consultas que stoy haciendo yo

export default API;
export { fetchAgroproductividad, fetchInfrastructure, fetchAgroproductividadByMun, fetchParcelasAfectadas, fetchParcelasAfectadasByMun };
