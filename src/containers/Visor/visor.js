import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Layout } from 'antd';
import Logo from './../../components/Icons';
import makeSelectSider from './../Sider/selectors';
import Map from './../../components/Map.js';
import React, { Component } from 'react';
import Sider from './../Sider';
import styled from 'styled-components';

const { Content } = Layout;

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

class Visor extends Component {
	state = {
		visible: false
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const { sider: { layers } } = this.props;
		return (
			<div>
				<Map layers={layers} drawer={this.state.visible} />
				<Content>
					<LogoContainer>
						<LogoImg src={Logo} alt="" />
						<Span>
							AGRO <small style={{ color: '#5b784d', margin: '0px 0px 0px -10px' }}>map</small>
						</Span>
					</LogoContainer>
				</Content>
				<Sider visible={this.state.visible} showDrawer={this.showDrawer} onClose={this.onClose} />
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
