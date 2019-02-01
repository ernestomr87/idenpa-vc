import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { CareImg, CoastImg, IrrigationImg, MoneyBagImg, TractorImg, SpeedometerImg } from './../../components/Icons';

import Home from './../Home';
import Inversions from './../Inversions';

const { Header, Content, Footer, Sider } = Layout;

const Logo = styled.div`
	height: 32px;
	background: rgba(255, 255, 255, .2);
	margin: 16px;
`;

const IconTrigger = styled(Icon)`
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color .3s;
	&:hover{
		color: #1890ff;	
	}
`;

const ImgIcon = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 5px;
	margin-top: -5px;
`;

export class Dashboard extends Component {
	state = {
		collapsed: false
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<Logo />
					<Menu theme="dark" defaultSelectedKeys={[ '0' ]} >
						<Menu.Item key="0">
							<Link to="/dashboard/home">
								<ImgIcon src={SpeedometerImg} alt="" />
								<span>Home</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="1">
							<Link to="/dashboard/inversions">
								<ImgIcon src={MoneyBagImg} alt="" />
								<span>Inversiones</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Link to="/dashboard/irrigation">
								<ImgIcon src={IrrigationImg} alt="" />
								<span>Riego</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="3">
							<ImgIcon src={TractorImg} alt="" />
							<span>Maquinarias</span>
						</Menu.Item>
						<Menu.Item key="4">
							<ImgIcon src={CoastImg} alt="" />
							<span>Estructura Agrícola</span>
						</Menu.Item>
						<Menu.Item key="5">
							<ImgIcon src={CareImg} alt="" />
							<span>Proyecto Vida</span>
						</Menu.Item>
						<Menu.Item key="6">
							<Icon type="setting" />
							<span>Configuración</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<IconTrigger type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							<Switch>
								<Route exact path="/dashboard/home" component={Home} />
								<Route path="/dashboard/inversions" component={Inversions} />
								<Redirect from="/dashboard" to="/dashboard/home" />
							</Switch>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => ({
	route: state.route
});

const WrappedDashboard = connect(mapStateToProps, {})(Dashboard);

export default WrappedDashboard;
