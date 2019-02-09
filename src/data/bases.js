
export default [{
	name: 'Límites Municipales',
	nomenclature: null,
	wms:'ws_ide_vcl:limite_municipal',
	json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:limite_municipal&outputFormat=application%2Fjson'
},
{
	name: 'Límites Municipaless',
	nomenclature: null,
	json: 'http://localhost:3001/api/sitema_agricola/forma_prodictiva/725637272/usoTenencia'
}
];