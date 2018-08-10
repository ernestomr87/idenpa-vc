import React, { Component } from 'react';
import styled from 'styled-components';
import { ToggleGroup, DigitizeButton, MeasureButton, ZoomButton } from '@terrestris/react-geo';
import { Tooltip, Popover } from 'antd';

import {
	MapsIco,
	PencilIco,
	PolygonIco,
	CompassIco,
	FrameIco,
	DistancedIco,
	DistanceIco,
	DistancemIco,
	AreaIco,
	AngleIco,
	PencilMIco,
	MeasuringIco,
	TextIco,
	SelectIco,
	PapersIco,
	DeleteIco
} from './Icons';

const ImgContent = styled.img`
	width: 15px;
	height: 15px;
	margin: 6px 0 6px 5px;
	cursor: pointer
	&:hover {
		transform: scale(1.10, 1.10);
	}
`;

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

const popoverTool1 = (map) => (
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
const popoverTool2 = (map) => (
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

export class Tools extends Component {
	state = {
		visibleTool1: false,
		visibleTool2: false
	};

	showTool = (view) => {
		if (view === 1) {
			if (this.state.visibleTool1) return this.setState({ visibleTool1: false, visibleTool2: false });
			return this.setState({ visibleTool1: true, visibleTool2: false });
		}
		if (this.state.visibleTool2) return this.setState({ visibleTool1: false, visibleTool2: false });
		return this.setState({ visibleTool1: false, visibleTool2: true });
	};

	render() {
		const { map } = this.props;
		return (
			<div>
				<Zoom shape="circle" icon="plus-circle" map={map} />
				<Zoom shape="circle" icon="minus-circle" style={{ top: 45 }} map={map} delta={-1} />
				<ToolsBar>
					<Popover
						visible={this.state.visibleTool1}
						placement="left"
						content={popoverTool1(map)}
						trigger="hover"
					>
						<ImgContent onClick={this.showTool.bind(this, 1)} src={PencilMIco} alt="" />
					</Popover>
					<Popover
						visible={this.state.visibleTool2}
						placement="left"
						content={popoverTool2(map)}
						trigger="hover"
					>
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
			</div>
		);
	}
}

export default Tools;
