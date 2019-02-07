import config from './../config.js'
const API = config.api;
const axios = require('axios');


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
export {
	fetchAgroproductividad,
	fetchInfrastructure,
	fetchAgroproductividadByMun,
	fetchParcelasAfectadas,
	fetchParcelasAfectadasByMun
};