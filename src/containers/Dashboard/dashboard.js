import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

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

const LayoutWrapper = styled(Layout)`
	min-height: 100vh;
	.ant-layout-header {
		height: 60px;
		line-height: 60px;
	}
`;

class Dashboard extends Component {
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
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<LogoDiv />
					<Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline">
						<Menu.Item key="1">
							<Icon type="pie-chart" />
							<span>Option 1</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="desktop" />
							<span>Option 2</span>
						</Menu.Item>
						<SubMenu
							key="sub1"
							title={
								<span>
									<Icon type="user" />
									<span>User</span>
								</span>
							}
						>
							<Menu.Item key="3">Tom</Menu.Item>
							<Menu.Item key="4">Bill</Menu.Item>
							<Menu.Item key="5">Alex</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub2"
							title={
								<span>
									<Icon type="team" />
									<span>Team</span>
								</span>
							}
						>
							<Menu.Item key="6">Team 1</Menu.Item>
							<Menu.Item key="8">Team 2</Menu.Item>
						</SubMenu>
						<Menu.Item key="9">
							<Icon type="file" />
							<span>File</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }} />
					<Content style={{ margin: '24px 16px 0' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>content</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
				</Layout>
			</LayoutWrapper>
		);
	}
}

const mapStateToProps = (state) => ({
	route: state.route
});

const WrappedDashboard = connect(mapStateToProps, {})(Dashboard);

export default WrappedDashboard;
