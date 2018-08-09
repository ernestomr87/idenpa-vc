import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Map from './../../components/Map';
import Sider from './../Sider';
import { Layout, Icon, Tooltip } from 'antd';
import makeSelectSider from './../Sider/selectors';

import Logo from './icons/logo.svg';
import MapsIco from './icons/maps-and-flags.svg';
import PencilIco from './icons/pencil.svg';
import PolygonIco from './icons/polygon.svg';
import CompassIco from './icons/compass.svg';
import FrameIco from './icons/frame.svg';
import TextIco from './icons/text.svg';
import SelectIco from './icons/select.svg';
import PapersIco from './icons/papers.svg';
import DeleteIco from './icons/delete.svg';

const { Content } = Layout;

const ImgContent = styled.img`
	width: 15px;
	height: 15px;
	margin: 6px 0 6px 5px;
	cursor: pointer
	&:hover {
		transform: scale(1.10, 1.10);
	}
`;

const LogoImg = styled.img`
	width: 50px;
	height: 50px;
	filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.8));
`;

const Span = styled.span`
	font-weight: 500;
	font-size: 20px;
	font-family: Consolas, Menlo, Courier, monospace;
	color: #fff;
	filter: drop-shadow(0 0 2px #5b784d);
`;
const LogoContainer = styled.div`
	position: absolute;
	top: 1px;
	right: 50%;
`;
const ToolsBar = styled.div`
	position: absolute;
	top: 80px;
	right: 8px;
	width: 25px;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 25px;
`;

const PlusZoom = styled(Icon)`
	&.anticon{
		position: absolute;
		top: 10px;
		right: 8px;
		font-size: 25px;
	
	}
	&.anticon:hover{
		transform: scale(1.05, 1.05)
	}
`;
const MinusZoom = styled(Icon)`
	&.anticon{
		position: absolute;
		top: 40px;
		right: 8px;
		font-size: 25px;
	
	}
	&.anticon:hover{
		transform: scale(1.05, 1.05)
	}
`;

class Visor extends Component {
	state = {
		visible: false
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	render() {
		const { sider: { layers } } = this.props;
		return (
			<div>
			<Map layers={layers} />
				<Content>
					
					<LogoContainer>
						<LogoImg src={Logo} alt="" />
						<Span>
							AGRO <small style={{ color: '#5b784d', margin: '0px 0px 0px -10px' }}>map</small>
						</Span>
					</LogoContainer>
					<PlusZoom type="plus-circle" />
					<MinusZoom type="minus-circle" />
					<ToolsBar>
						<Tooltip placement="leftTop" title="Punto">
							<ImgContent src={MapsIco} alt="" />
						</Tooltip>
						<Tooltip placement="leftTop" title="Línea">
							<ImgContent src={PencilIco} alt="" />
						</Tooltip>
						<Tooltip placement="leftTop" title="Polígono">
							<ImgContent src={PolygonIco} alt="" />
						</Tooltip>
						<Tooltip placement="leftTop" title="Círculo">
							<ImgContent src={CompassIco} alt="" />
						</Tooltip>
						<Tooltip placement="leftTop" title="Rectángulo">
							<ImgContent src={FrameIco} alt="" />
						</Tooltip>
						<Tooltip placement="leftTop" title="Selecciona y Modifica">
							<ImgContent src={SelectIco} alt="" />
						</Tooltip>
						<Tooltip placement="leftTop" title="Copiar">
							<ImgContent src={PapersIco} alt="" />
						</Tooltip>
						<Tooltip placement="leftTop" title="Eliminar">
							<ImgContent src={DeleteIco} alt="" />
						</Tooltip>
					</ToolsBar>
				</Content>
				<Sider />
			</div>
		);
	}
}

Visor.defaultProps = {
	sider: {
		item: null,
		layers: []
	}
};

Visor.propTypes = {};

const mapStateToProps = createStructuredSelector({
	sider: makeSelectSider()
});

const withConnect = connect(mapStateToProps, {});

export default compose(withConnect)(Visor);
