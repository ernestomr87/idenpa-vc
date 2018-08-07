export default [
	{
		name: 'Obras en ejecución',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cuba:invers_sym_obras&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Entidades Inversionistas',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cuba:invers_sym_inversionistas&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Riego Maquina',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cuba:riego_maquina_pivot&outputFormat=application%2Fjson'
	}
];
