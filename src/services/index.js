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


const fetchParcelasAfectadas = () => {
	return axios.get(`${API}/api/afectaciones/parcelasAfectadas`);
};

const fetchParcelasAfectadasByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/parcelasAfectadas/${mun}`);
};

const fetchFormasProductivasById = (id) => {
	return axios.get(`${API}/api/sitema_agricola/forma_prodictiva/${id}`);
};

const fetchTermosByFormasProductiva = (id) => {
	return axios.get(`${API}/api/sitema_agricola/forma_prodictiva/${id}/termos`);
};

export default API;
export {
	fetchAgroproductividad,
	fetchInfrastructure,
	fetchAgroproductividadByMun,
	fetchParcelasAfectadas,
	fetchParcelasAfectadasByMun,
	fetchFormasProductivasById,
	fetchTermosByFormasProductiva
};