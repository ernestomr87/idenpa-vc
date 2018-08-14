import React, { Component } from 'react';
import styled from 'styled-components';
import { ToggleGroup, DigitizeButton, MeasureButton, ZoomButton } from '@terrestris/react-geo';
import { Tooltip, Popover, Button } from 'antd';

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
	margin: 6px auto;
	cursor: pointer;
	&:hover {
		transform: scale(1.10, 1.10);
	}
`;

const ToolsBar = styled.div`
	position: absolute;
	bottom: 10px;
	right: 8px;
	width: 30px;
`;
const Digitize = styled(DigitizeButton)`
	&.ant-btn{
		background-color: rgba(0,0,0,0.6);
		margin: 1px 0;
	}

`;
const Measure = styled(MeasureButton)`
	&.ant-btn{
		background-color: rgba(0,0,0,0.6);
		margin: 1px 0;
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
const SpaceDiv = styled.div`margin: 5px 0;`;

export class Tools extends Component {
	state = {
		visibleTool1: false,
		visibleTool2: false
	};

	hideTool = () => {
		return this.setState({ visibleTool1: false, visibleTool2: false });
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
					<ToggleGroup>
						<Digitize shape="circle" name="drawPoint" map={map} drawType="Point">
							<Tooltip placement="leftTop" title="Dibujar Punto">
								<ImgContent src={MapsIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize shape="circle" name="drawLine" map={map} drawType="LineString">
							<Tooltip placement="leftTop" title="Dibujar Línea">
								<ImgContent src={PencilIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize shape="circle" name="drawPolygon" map={map} drawType="Polygon">
							<Tooltip placement="leftTop" title="Dibujar Polígono">
								<ImgContent src={PolygonIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize shape="circle" name="drawCircle" map={map} drawType="Circle">
							<Tooltip placement="leftTop" title="Dibujar Círculo">
								<ImgContent src={CompassIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize shape="circle" name="drawRectangle" map={map} drawType="Rectangle">
							<Tooltip placement="leftTop" title="Dibujar Rectángulo">
								<ImgContent src={FrameIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize name="drawText" map={map} drawType="Text" shape="circle" onClick={this.hideTool}>
							<Tooltip placement="leftTop" title="Insertar Texto">
								<ImgContent src={TextIco} alt="" />
							</Tooltip>
						</Digitize>
						<SpaceDiv />
						<Measure shape="circle" name="line" map={map} measureType="line">
							<Tooltip placement="leftTop" title="Medir Distancia">
								<ImgContent src={DistancedIco} alt="" />
							</Tooltip>
						</Measure>

						<Measure
							shape="circle"
							name="steps"
							map={map}
							measureType="line"
							showMeasureInfoOnClickedPoints
						>
							<Tooltip placement="leftTop" title="Medir Distancia por pasos">
								<ImgContent src={DistanceIco} alt="" />
							</Tooltip>
						</Measure>

						<Measure shape="circle" name="multi" map={map} measureType="line" multipleDrawing>
							<Tooltip placement="leftTop" title="Medir Distancia multiples puntos">
								<ImgContent src={DistancemIco} alt="" />
							</Tooltip>
						</Measure>

						<Measure shape="circle" name="poly" map={map} measureType="polygon">
							<Tooltip placement="leftTop" title="Medir Área">
								<ImgContent src={AreaIco} alt="" />
							</Tooltip>
						</Measure>

						<Measure shape="circle" name="angle" map={map} measureType="angle">
							<Tooltip placement="leftTop" title="Medir Ángulo">
								<ImgContent src={AngleIco} alt="" />
							</Tooltip>
						</Measure>
						<SpaceDiv />
						<Digitize
							name="selectAndModify"
							map={map}
							editType="Edit"
							shape="circle"
							onClick={this.hideTool}
						>
							<Tooltip placement="leftTop" title="Modificar característica">
								<ImgContent src={SelectIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize shape="circle" onClick={this.hideTool} name="copyFeature" map={map} editType="Copy">
							<Tooltip placement="leftTop" title="Copiar característica">
								<ImgContent src={PapersIco} alt="" />
							</Tooltip>
						</Digitize>

						<Digitize
							shape="circle"
							onClick={this.hideTool}
							name="deleteFeature"
							map={map}
							editType="Delete"
						>
							<Tooltip placement="leftTop" title="Eliminar característica">
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
