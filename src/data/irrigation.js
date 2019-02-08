import globalStyles from './markerStyles'

export default [{
		name: 'Micropresas del Minag',
		nomenclature: 'nomenclatureMicropresas',
		style: globalStyles.micropresas,
		opacity: 0.5,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:micropresa&outputFormat=application%2Fjson'
	},
	{
		name: 'Enrrolladores',
		nomenclature: 'nomenclatureEnrolladores',
		style: globalStyles.enrolladores,
		opacity: 0.5,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:abrenrrollador&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales Vertedores',
		nomenclature: 'nomenclatureCanales',
		style: globalStyles.canalesvertedores,
		opacity: 0.5,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:cvertedor&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales secundarios de riego',
		nomenclature: 'nomenclatureCanales',
		style: globalStyles.canalessecundariosderiego,
		opacity: 0.5,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:crsecundario&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales colectores',
		nomenclature: 'nomenclatureCanales',
		style: globalStyles.canalescolectores,
		opacity: 0.5,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:ccolector&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales Magistrales',
		nomenclature: 'nomenclatureCanales',
		style: globalStyles.canalesmagistrales,
		opacity: 0.5,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:cmagistral&outputFormat=application%2Fjson'
	},
	{
		name: 'Áreas bajo riego por goteo',
		nomenclature: 'nomenclatureRiegoxGoteo',
		style: globalStyles.riegoporgoteo,
		opacity: 0.5,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:abrgoteo&outputFormat=application%2Fjson'
	},
	{
		name: 'Estaciones de bombeo',
		nomenclature: 'nomenclatureEstacionesBombeo',
		style: globalStyles.estacionesdebombeo,
		opacity: 0.7,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:ebombeo&outputFormat=application%2Fjson'
	},
	{
		name: 'Máquinas Pivot',
		nomenclature: 'nomenclatureMaquinasPivot',
		style: globalStyles.maquinaspivot,
		opacity: 0.5,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_geodeleg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_geodeleg:maquina_pivot&outputFormat=application/json'
	}
];