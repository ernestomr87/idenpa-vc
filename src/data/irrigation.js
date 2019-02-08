import globalStyles from './markerStyles'

export default [{
		name: 'Micropresas del Minag',
		nomenclature: 'nomenclatureMicropresas',
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:micropresa&outputFormat=application%2Fjson'
	},
	{
		name: 'Enrrolladores',
		nomenclature: 'nomenclatureEnrolladores',
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:abrenrrollador&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales Vertedores',
		nomenclature: 'nomenclatureCanales',
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:cvertedor&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales secundarios de riego',
		nomenclature: 'nomenclatureCanales',
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:crsecundario&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales colectores',
		nomenclature: 'nomenclatureCanales',
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:ccolector&outputFormat=application%2Fjson'
	},
	{
		name: 'Canales Magistrales',
		nomenclature: 'nomenclatureCanales',
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:cmagistral&outputFormat=application%2Fjson'
	},
	{
		name: 'Áreas bajo riego por goteo',
		nomenclature: 'nomenclatureRiegoxGoteo',
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:abrgoteo&outputFormat=application%2Fjson'
	},
	{
		name: 'Estaciones de bombeo',
		nomenclature: 'nomenclatureEstacionesBombeo',
		style: globalStyles.bombeo,
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:ebombeo&outputFormat=application%2Fjson'
	},
	{
		name: 'Máquinas Pivot',
		nomenclature: 'nomenclatureMaquinasPivot',
		json: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/ws_ide_vcl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ws_ide_vcl:maquina_pivot&outputFormat=application%2Fjson'
	}
];