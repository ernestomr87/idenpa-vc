export default [
	{
		name: 'Obras en ejecución',
		nomenclature: 'nomenclatureObrasEjec',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cuba:invers_sym_obras&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Entidades Inversionistas',
		nomenclature: 'nomenclatureEntidadesInv',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cuba:invers_sym_inversionistas&maxFeatures=50&outputFormat=application%2Fjson'
	}
];
