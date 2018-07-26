import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Layout, Drawer, Button, Icon, Card } from 'antd';

import Map from './../../components/Map';

const LogoDiv = styled.div`
	height: 32px;
	background: rgba(255, 255, 255, .2);
	margin: 16px;
`;

const Trigger = styled(Button)`
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color .3s;
	position: absolute !important;
    top: 10px;
    left: 10px;
    z-index: 10;
	&:hover {
		color: #1890ff;
	}

`;

const { Header, Content, Sider } = Layout;

const LayoutWrapper = styled(Layout)`
	min-height: 100vh;
	.ant-layout-header {
		height: 60px;
		line-height: 60px;
	}
`;

class Visor extends Component {
	state = {
		collapsed: false
	};

	onCollapse = (collapsed) => {
		this.setState({ collapsed: !this.state.collapsed });
	};

	showDrawer = () => {
		this.setState({
			collapsed: true
		});
	};

	onClose = () => {
		this.setState({
			collapsed: false
		});
	};

	render() {
		const { route: { location } } = this.props;
		return (
			<LayoutWrapper>
				<Layout>
					<Trigger
						onClick={this.onCollapse}
						type="primary"
						shape="circle"
						icon={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
						size="large"
					/>

					<Map />
				</Layout>
				<Drawer
					width={390}
					mask={false}
					placement="left"
					closable={false}
					visible={this.state.collapsed}
					style={{
						height: '100%',
						overflow: 'auto',
						paddingBottom: 53,
						padding: 10,
						backgroundColor: 'rgb(245, 245, 245)'
					}}
				>
					<Icon
						style={{
							cursor: 'pointer',
							position: 'absolute',
							right: 10,
							zIndex: 1000
						}}
						onClick={this.onCollapse}
						type="close-circle-o"
					/>
					<Card style={{ marginTop: 25 }}>
						<Button
							style={{ margin: '0 10px' }}
							shape="circle"
							type="primary"
							icon="setting"
							size="large"
						/>
						<Button
							style={{ margin: '0 10px' }}
							shape="circle"
							type="primary"
							icon="star"
							size="large"
						/>
						<Button
							style={{ margin: '0 10px' }}
							shape="circle"
							type="primary"
							icon="heart"
							size="large"
						/>
						<Button
							style={{ margin: '0 10px' }}
							shape="circle"
							type="primary"
							icon="smile"
							size="large"
						/>
						<Button
							style={{ margin: '0 10px' }}
							shape="circle"
							type="primary"
							icon="home"
							size="large"
						/>
					</Card>
				</Drawer>
			</LayoutWrapper>
		);
	}
}

const mapStateToProps = (state) => ({
	route: state.route
});

const WrappedVisor = connect(mapStateToProps, {})(Visor);

export default WrappedVisor;
