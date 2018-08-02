export default [
	{
		name: 'Micropresas del Minag',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:micropresa&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Enrrolladores',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:abrenrrollador&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales Vertedores',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:cvertedor&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales Primarios de riego',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:crprimario&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Áreas bajo riego por goteo',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:abrgoteo&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales secundarios de riego',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:crsecundario&maxFeatures=50&outputFormat=application%2Fjson'
	},

	{
		name: 'Canales colectores',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:ccolector&maxFeatures=50&outputFormat=application%2Fjson'
	},

	{
		name: 'Canales Magistrales',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:cmagistral&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Estaciones de bombeo',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:ebombeo&maxFeatures=50&outputFormat=application%2Fjson'
	},
	{
		name: 'Máquinas Pivot',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:maquina_pivot&maxFeatures=50&outputFormat=application%2Fjson'
	}
];
