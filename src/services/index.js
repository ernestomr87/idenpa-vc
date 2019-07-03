import config from './../config.js'
const API = config.api;
const axios = require('axios');


const fetchAgroproductividad = () => {
	return axios.get(`${API}/api/afectaciones/agroproductividad`);
};

const fetchAgroproductividadByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/agroproductividad/${mun}`);
};

const fetchParcelasAfectadas = () => {
	return axios.get(`${API}/api/afectaciones/parcelasAfectadas`);
};

const fetchParcelasAfectadasByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/parcelasAfectadas/${mun}`);
};

const fetchusufructuariosAfectados = () => {
	return axios.get(`${API}/api/afectaciones/usufructuariosAfectados`);
};

const fetchusufructuariosAfectadosByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/usufructuariosAfectados/${mun}`);
};

const fetchAscensoDelMar = () => {
	return axios.get(`${API}/api/afectaciones/ascensoDelNivelMedioDelMar`);
};

const fetchAscensoDelMarByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/ascensoDelNivelMedioDelMar/${mun}`);
};

const fetchAreaIntrusionMarina = () => {
	return axios.get(`${API}/api/afectaciones/areaIntrusionMarina`);
};

const fetchAreaIntrusionMarinaByMun = (mun) => {
	return axios.get(`${API}/api/afectaciones/areaIntrusionMarina/${mun}`);
};

const fetchInfrastructure = (gid) => {
	return axios.get(`${API}/api/infrastructure/${gid}`);
};

const fetchFormasProductivasById = (id) => {
	return axios.get(`${API}/api/sitema_agricola/forma_prodictiva/${id}`);
};

const fetchTermosByFormasProductiva = (id) => {
	return axios.get(`${API}/api/sitema_agricola/forma_prodictiva/${id}/termos`);
};

const fetchUsoTenenciaByFormaProductiva = (id) => {
	return axios.get(`${API}/api/sitema_agricola/forma_prodictiva/${id}/usoTenencia/`);
};

export default API;
export {
	fetchAgroproductividad,
	fetchInfrastructure,
	fetchAgroproductividadByMun,
	fetchParcelasAfectadas,
	fetchParcelasAfectadasByMun,
	fetchusufructuariosAfectados,
	fetchusufructuariosAfectadosByMun,
	fetchAscensoDelMar,
	fetchAscensoDelMarByMun,
	fetchAreaIntrusionMarina,
	fetchAreaIntrusionMarinaByMun,
	fetchFormasProductivasById,
	fetchTermosByFormasProductiva,
	fetchUsoTenenciaByFormaProductiva
};