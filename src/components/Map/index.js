import React from 'react';
import { Drawer, message, Icon, Tooltip, Popover, Button, Table } from 'antd';
import { MapComponent, ToggleGroup, DigitizeButton, MeasureButton, ZoomButton } from '@terrestris/react-geo';
import styled from 'styled-components';
import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlFormatGeoJSON from 'ol/format/geojson';
import OlLayerVector from 'ol/layer/vector';
import OlSourceVector from 'ol/source/vector';
import OlInteractionSelect from 'ol/interaction/select';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import MoneyBagImg from './../../containers/Sider/icons/money-bag.svg';
import IrrigationImg from './../../containers/Sider/icons/farm.svg';
import TractorImg from './../../containers/Sider/icons/tractor.svg';
import CoastImg from './../../containers/Sider/icons/coast.svg';
import CareImg from './../../containers/Sider/icons/care.svg';

import MapsIco from './../../containers/Visor/icons/maps-and-flags.svg';
import PencilIco from './../../containers/Visor/icons/pencil.svg';
import PolygonIco from './../../containers/Visor/icons/polygon.svg';
import CompassIco from './../../containers/Visor/icons/compass.svg';
import FrameIco from './../../containers/Visor/icons/frame.svg';
import TextIco from './../../containers/Visor/icons/text.svg';
import SelectIco from './../../containers/Visor/icons/select.svg';
import PapersIco from './../../containers/Visor/icons/papers.svg';
import DeleteIco from './../../containers/Visor/icons/delete.svg';
import PencilMIco from './../../containers/Visor/icons/pencilm.svg';
import MeasuringIco from './../../containers/Visor/icons/measuring-tape.svg';
import DistanceIco from './../../containers/Visor/icons/distance.svg';
import DistancedIco from './../../containers/Visor/icons/distanced.svg';
import DistancemIco from './../../containers/Visor/icons/distancem.svg';
import AreaIco from './../../containers/Visor/icons/area.svg';
import AngleIco from './../../containers/Visor/icons/angle.svg';

import Modules, { getModelByJson } from './../../data/index';
import './../../react-geo.css';

const ImgContent = styled.img`
	width: 15px;
	height: 15px;
	margin: 6px 0 6px 5px;
	cursor: pointer
	&:hover {
		transform: scale(1.10, 1.10);
	}
`;

const MapWrapper = styled(MapComponent)`
	height: 100vh;
`;
const ImgInversion = styled.img`
	width: 25px;
	height: 25px;
	margin-top: -7px;
	margin-right: 10px;
`;
const P = styled.p`
	font-weight: 500;
	margin-right: 8px;
	display: inline-block;
	color: rgba(0, 0, 0, 0.85);
	font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;
const DI = styled.div`
	font-size: 14px,
	margin-bottom: 7px,
	color: 'rgba(0,0,0,0.65)'
    font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;
const Div = styled.div`height: 100vh;`;

const layer = new OlLayerTile({
	source: new OlSourceOsm()
});

const pStyle = {
	fontWeight: 500,
	fontSize: 16,
	color: 'rgba(0,0,0,0.85)',
	display: 'block',
	fontFamily: `"Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif`
};

const ToolsBar = styled.div`
	position: absolute;
	top: 80px;
	right: 8px;
	width: 25px;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 25px;
`;
const Digitize = styled(DigitizeButton)`
	&.ant-btn{
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		color:#445459
	}
	&.ant-btn:hover,&.ant-btn:active,&.ant-btn:focus{
		background-color: transparent;
		color:#1890ff
	}

	&.react-geo-togglebutton.btn-pressed {
		background-color: transparent !important;
		border-color: #e6e6e6;
		color:#445459
	}

`;
const Measure = styled(MeasureButton)`
	&.ant-btn{
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		color: black;
		text-align: left;
	}
	&.ant-btn:hover,&.ant-btn:active,&.ant-btn:focus{
		background-color: transparent;
		color:#1890ff
	}

	&.react-geo-togglebutton.btn-pressed {
		background-color: transparent !important;
		border-color: #e6e6e6;
		color:#445459
	}

`;

const Zoom = styled(ZoomButton)`
	&.ant-btn{
		position: absolute;
		top: 10px;
		right: 8px;
		background-color: rgba(0,0,0,0.6);
		width: 30px;
		height: 30px;
		&.anticon{
			font-size: 25px;
		}
		&.anticon:hover{
			transform: scale(1.05, 1.05)
		}
	}

	
`;

const DescriptionItem = ({ title, content }) => {
	return (
		<DI>
			<P>{title}:</P>
			{content}
		</DI>
	);
};

const map = new OlMap({
	visibleTool1: false,
	visibleTool2: false,
	view: new OlView({
		layers: [ layer ],
		projection: 'EPSG:4326',
		center: [ -80.009, 22.6083 ],
		zoom: 8
	}),
	controls: [],
	layers: [ layer ]
});

/* eslint-disable react/prefer-stateless-function */
class MapContainer extends React.Component {
	state = {
		test: '',
		layers: [],
		model: {},
		module: null,
		visible: false,
		properties: null,
		interaction: null
	};

	changeState = (feature, model, select) => {
		this.setState({
			visible: true,
			properties: feature,
			model: model.nomenclature,
			dataLayer: { module: model.data.mod, layer: model.data.layer },
			interaction: select
		});
	};

	componentWillReceiveProps = (nextProps) => {
		const { layers } = nextProps;

		if (layers !== this.props.layers) {
			let array = [];
			Object.keys(layers).forEach(function(key) {
				layers[key].map((item) => {
					const aux = Modules[key].filter((mitem) => {
						if (mitem.name === item) return mitem;
					});
					array.push(aux[0]);
				});
			});

			if (array.length > this.state.layers.length) {
				this.addLayer(array);
			}
			if (array.length < this.state.layers.length) {
				this.removeLayer(array);
			}
		}
	};

	addLayer = (array) => {
		let nlayers = this.state.layers;
		let diff;
		for (let j = 0; j < array.length; j++) {
			let exist = false;
			for (let i = 0; i < this.state.layers.length; i++) {
				if (
					array[j].name === this.state.layers[i].item.name &&
					array[j].json === this.state.layers[i].item.json
				) {
					exist = true;
					break;
				}
			}
			if (!exist) {
				diff = array[j];
				break;
			}
		}

		let aux = new OlLayerVector({
			source: new OlSourceVector({
				format: new OlFormatGeoJSON(),
				url: diff.json
			})
		});

		if (!map.getLayers().getArray().includes(aux)) {
			nlayers.push({ item: diff, layer: aux });
			map.addLayer(aux);

			aux.getSource().on('change', function() {
				message.success(`Capa "${diff.name}" cargada.`, 1);
			});
		}
		this.setState({ layers: nlayers });
	};

	removeLayer = (array) => {
		let nlayers = [];
		let diff;
		for (let j = 0; j < this.state.layers.length; j++) {
			let exist = false;
			for (let i = 0; i < array.length; i++) {
				if (
					array[i].name === this.state.layers[j].item.name &&
					array[i].json === this.state.layers[j].item.json
				) {
					exist = true;
					break;
				}
			}
			if (!exist) {
				diff = this.state.layers[j];
			} else {
				nlayers.push(this.state.layers[j]);
			}
		}

		if (map.getLayers().getArray().includes(diff.layer)) {
			map.removeLayer(diff.layer);
		}

		this.setState({ layers: nlayers });
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		const { interaction } = this.state;
		interaction.clear();
		this.setState({
			visible: false,
			interaction: null
		});
	};

	showTool = (tool) => {
		if (tool === 1) {
			if (this.state.visibleTool1) return this.setState({ visibleTool1: false, visibleTool2: false });
			return this.setState({ visibleTool1: true, visibleTool2: false });
		}
		if (this.state.visibleTool2) return this.setState({ visibleTool1: false, visibleTool2: false });
		return this.setState({ visibleTool1: false, visibleTool2: true });
	};

	renderDataView = () => {
		const { model, properties, dataLayer } = this.state;
		const dataSource = [];
		const columns = [
			{
				dataIndex: 'key',
				key: 'key',
				render: (text) => {
					return <span style={{ color: 'rgb(19, 116, 205)' }}>{text}</span>;
				}
			},
			{
				dataIndex: 'value',
				key: 'value'
			}
		];
		Object.keys(model).forEach(function(key, index) {
			if (properties[key]) {
				dataSource.push({ key: model[key], value: properties[key] });
			}
		});
		if (dataSource.length > 1) {
			return (
				<div>
					<p style={{ ...pStyle, marginBottom: 24 }}>
						{/* Muestro el Icono del modulo al que pertenece la Feature seleccionada */}
						{dataLayer.module === 'irrigation' ? <ImgInversion src={IrrigationImg} alt="" /> : null}
						{dataLayer.module === 'investments' ? <ImgInversion src={MoneyBagImg} alt="" /> : null}
						{dataLayer.module === 'machinery' ? <ImgInversion src={TractorImg} alt="" /> : null}
						{dataLayer.module === 'northCoast' ? <ImgInversion src={CoastImg} alt="" /> : null}
						{dataLayer.module === 'lifeTask' ? <ImgInversion src={CareImg} alt="" /> : null}

						{dataLayer.layer}
					</p>
					<Table
						size="small"
						pagination={false}
						showHeader={false}
						dataSource={dataSource}
						columns={columns}
					/>
				</div>
			);
		}
	};

	render() {
		const _this = this;
		const select = new OlInteractionSelect();
		map.addInteraction(select);
		const selectedfeatures = select.getFeatures();

		// selectedfeatures.on([ 'add', 'remove' ], (evt) => {
		// 	map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
		// 		selectedfeatures.getArray().map((feature) => {
		// 			let selectedLayer = select.getLayer(feature);
		// 			const model = getModelByJson(selectedLayer.getSource().url_);
		// 			_this.changeState(feature.getProperties(), model, selectedfeatures);
		// 		});
		// 	});
		// });

		const content = (
			<ToggleGroup>
				<Digitize name="drawPoint" map={map} drawType="Point">
					<ImgContent src={MapsIco} alt="" /> Punto
				</Digitize>

				<Digitize name="drawLine" map={map} drawType="LineString">
					<Tooltip placement="leftTop" title="Línea">
						<ImgContent src={PencilIco} alt="" /> Línea
					</Tooltip>
				</Digitize>

				<Digitize name="drawPolygon" map={map} drawType="Polygon">
					<Tooltip placement="leftTop" title="Polígono">
						<ImgContent src={PolygonIco} alt="" /> Polígono
					</Tooltip>
				</Digitize>

				<Digitize name="drawCircle" map={map} drawType="Circle">
					<Tooltip placement="leftTop" title="Círculo">
						<ImgContent src={CompassIco} alt="" /> Círculo
					</Tooltip>
				</Digitize>

				<Digitize name="drawRectangle" map={map} drawType="Rectangle">
					<Tooltip placement="leftTop" title="Rectángulo">
						<ImgContent src={FrameIco} alt="" /> Rectángulo
					</Tooltip>
				</Digitize>
			</ToggleGroup>
		);
		const content1 = (
			<ToggleGroup>
				<Measure name="line" map={map} measureType="line">
					<ImgContent src={DistancedIco} alt="" /> Distancia
				</Measure>

				<Measure name="steps" map={map} measureType="line" showMeasureInfoOnClickedPoints>
					<ImgContent src={DistanceIco} alt="" /> Distancia por pasos
				</Measure>

				<Measure name="multi" map={map} measureType="line" multipleDrawing>
					<ImgContent src={DistancemIco} alt="" /> Distancia multiples puntos
				</Measure>

				<Measure name="poly" map={map} measureType="polygon">
					<ImgContent src={AreaIco} alt="" /> Área
				</Measure>

				<Measure name="angle" map={map} measureType="angle">
					<ImgContent src={AngleIco} alt="" /> Ángulo
				</Measure>
			</ToggleGroup>
		);

		return (
			<Div>
				<MapWrapper map={map} />
				<Zoom shape="circle" icon="plus-circle" map={map} />
				<Zoom shape="circle" icon="minus-circle" style={{ top: 45 }} map={map} delta={-1} />

				<ToolsBar>
					<Popover visible={this.state.visibleTool1} placement="left" content={content} trigger="hover">
						<ImgContent onClick={this.showTool.bind(this, 1)} src={PencilMIco} alt="" />
					</Popover>
					<Popover visible={this.state.visibleTool2} placement="left" content={content1} trigger="hover">
						<ImgContent onClick={this.showTool.bind(this, 2)} src={MeasuringIco} alt="" />
					</Popover>
					<ToggleGroup>
						<Digitize name="drawText" map={map} drawType="Text">
							<Tooltip placement="leftTop" title="Eliminar">
								<ImgContent src={TextIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize name="selectAndModify" map={map} editType="Edit">
							<Tooltip placement="leftTop" title="Selecciona y Modifica">
								<ImgContent src={SelectIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize name="copyFeature" map={map} editType="Copy">
							<Tooltip placement="leftTop" title="Copiar">
								<ImgContent src={PapersIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize name="deleteFeature" map={map} editType="Delete">
							<Tooltip placement="leftTop" title="Eliminar">
								<ImgContent src={DeleteIco} alt="" />
							</Tooltip>
						</Digitize>
					</ToggleGroup>
				</ToolsBar>

				<Drawer
					width={500}
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					{this.renderDataView()}
				</Drawer>
			</Div>
		);
	}
}

MapContainer.defaultProps = {
	layers: []
};

export default MapContainer;
