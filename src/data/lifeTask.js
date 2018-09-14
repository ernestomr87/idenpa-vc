export default [
	{
		name: 'Polígonos de suelo afectado',
		nomenclature: 'nomenclatureMicropresas',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/dbtarea_vida/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dbtarea_vida:suelo_afectado&outputFormat=application%2Fjson'
	},
	{
		name: 'Parcelas agrícolas afectadas',
		nomenclature: 'nomenclatureMicropresas',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/dbtarea_vida/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dbtarea_vida:parcela_agricola_afectada&outputFormat=application%2Fjson'
	},
	{
		name: 'Ascenso del nivel medio del mar',
		nomenclature: 'nomenclatureMicropresas',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/dbtarea_vida/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dbtarea_vida:ascenso_nmm&outputFormat=application%2Fjson'
	},
	{
		name: 'Área de intrusión marina',
		nomenclature: 'nomenclatureMicropresas',
		json:
			'http://geoservicios.enpa.vcl.minag.cu/geoserver/dbtarea_vida/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dbtarea_vida:area_intrusion_marina&maxFeatures=50&outputFormat=application%2Fjson'
	}
];

/*
dbtarea_vida
user: root
password: root 
[10:41 AM] GEOMATICA-1:
host: 192.168.0.11
*/
