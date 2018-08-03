import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Map from './../../components/Map';
import Sider from './../Sider';
import Modules from './../../data/index';
import { Layout, Icon } from 'antd';

const { Content } = Layout;

const LayoutWrapper = styled(Layout)`
	min-height: 100vh;
	.ant-layout-header {
		height: 60px;
		line-height: 60px;
	}
`;

const MenuUnfold = styled(Icon)`
	&.anticon{
		font-size: 40px;
		color: rgb(0, 136, 204);
		position: absolute;
		z-index: 1000;
		left: 10px;
		top: 10px;
		cursor: pointer;
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
		return (
			<LayoutWrapper>
				<Layout>
					<Content>
						<Map />
					</Content>
				</Layout>
				<Sider />
			</LayoutWrapper>
		);
	}
}

const mapStateToProps = (state) => ({
	route: state.route
});

const WrappedVisor = connect(mapStateToProps, {})(Visor);

export default WrappedVisor;
