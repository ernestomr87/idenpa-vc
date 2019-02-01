export default [
	{
		name: 'Obras en ejecución',
		nomenclature: 'nomenclatureObrasEjec',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cuba:invers_sym_obras&outputFormat=application%2Fjson'
	},
	{
		name: 'Entidades Inversionistas',
		nomenclature: 'nomenclatureEntidadesInv',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:entidad&outputFormat=application%2Fjson'
	}
];
