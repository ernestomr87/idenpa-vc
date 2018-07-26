import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import Map from './../../components/Map';

const LogoDiv = styled.div`
	height: 32px;
	background: rgba(255, 255, 255, .2);
	margin: 16px;
`;

const Trigger = styled(Icon)`
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color .3s;
	&:hover {
		color: #1890ff;
	}
`;

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const LayoutWrapper = styled(Layout)`
	min-height: 100vh;
	.ant-layout-header {
		height: 60px;
		line-height: 60px;
	}
`;

class App extends Component {
	state = {
		collapsed: false
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};
	render() {
		const { route: { location } } = this.props;
		return (
			<LayoutWrapper>
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<LogoDiv />
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Trigger type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
					</Header>
					<Content>
						<Map />
					</Content>
				</Layout>
			</LayoutWrapper>
		);
	}
}

const mapStateToProps = (state) => ({
	route: state.route
});

const WrappedApp = connect(mapStateToProps, {})(App);

export default WrappedApp;
