import React from 'react';
import styled from 'styled-components';
import { Drawer, Table } from 'antd';
import { CircleMenu, SimpleButton } from '@terrestris/react-geo';
import { IrrigationImg, MoneyBagImg, TractorImg, CoastImg, CareImg } from './Icons';
import Modules, { getModelByJson } from './../data/index';

let flag = false;

const pStyle = {
	fontWeight: 500,
	fontSize: 16,
	color: 'rgba(0,0,0,0.85)',
	display: 'block',
	fontFamily: `"Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif`
};

const ImgInversion = styled.img`
	width: 25px;
	height: 25px;
	margin-top: -7px;
	margin-right: 10px;
`;

class CircleMenuComponent extends React.Component {
	state = {
		mapMenuCoords: [],
		visibleMap: false
	};

	renderDataView = () => {
		const { model, properties, dataLayer } = this.props;
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
		const { mapMenuCoords, visibleMap } = this.state;
		const { mapContainer, mapDivId, changeState, selectedfeatures } = this.props;

		// mapContainer.on('singleclick', (evt) => {
		// 	if (!flag) {
		// 		flag = !flag;
		// 		const map = evt.map;
		// 		const mapEl = document.getElementById(mapDivId);
		// 		// const pixel = map.getPixelFromCoordinate([ 135.1691495, 34.6565482 ]);
		// 		const evtPixel = map.getPixelFromCoordinate(evt.coordinate);
		// 		let visibleMap;
		// 		let mapMenuCoords;

		// 		map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
		// 			const model = getModelByJson(layer.getSource().url_);
		// 			changeState(feature.getProperties(), model, selectedfeatures);
		// 		});

		// 		// if (map.hasFeatureAtPixel(evtPixel)) {
		// 		// 	console.log(evtPixel);
		// 		// 	visibleMap = true;
		// 		// 	mapMenuCoords = [ evtPixel[0] + mapEl.offsetLeft, evtPixel[1] + mapEl.offsetTop ];
		// 		// } else {
		// 		// 	visibleMap = false;
		// 		// }

		// 		this.setState({
		// 			mapMenuCoords,
		// 			visibleMap
		// 		});
		// 		flag = false;
		// 	}
		// });

		return (
			<div>
				{visibleMap ? (
					<CircleMenu position={mapMenuCoords} diameter={80} animationDuration={500}>
						<SimpleButton icon="pencil" shape="circle" />
						<SimpleButton icon="line-chart" shape="circle" />
						<SimpleButton icon="link" shape="circle" />
						<SimpleButton icon="thumbs-o-up" shape="circle" />
						<SimpleButton icon="bullhorn" shape="circle" />
					</CircleMenu>
				) : null}
			</div>
		);
	}
}

export default CircleMenuComponent;
