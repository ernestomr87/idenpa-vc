import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Map from './../../components/Map';
import Modules from './../../data/index';
import { Layout, Tree, Icon, Row, Col, Button, Drawer, Tooltip, Divider, Tabs, Radio } from 'antd';

import MoneyBagImg from './icons/money-bag.svg';
import IrrigationImg from './icons/farm.svg';
import TractorImg from './icons/tractor.svg';
import CoastImg from './icons/coast.svg';
import CareImg from './icons/care.svg';
import LayersImg from './icons/layers.svg';
import QuestionImg from './icons/question.svg';
import PresentationImg from './icons/presentation.svg';

const { Content } = Layout;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;

const LayoutWrapper = styled(Layout)`
	min-height: 100vh;
	.ant-layout-header {
		height: 60px;
		line-height: 60px;
	}
`;
const TreeNodeWrapper = styled(TreeNode)`
	.ant-tree-switcher{
		display: none !important;
	}`;

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
const ImgInversion = styled.img`
	width: 25px;
	height: 25px;
	margin-top: -7px;
`;
const ImgSecondChoice = styled.img`
	width: 20px;
	height: 20px;
	margin-top: -5px;
	margin-left: -10px;
`;

const treeData = [
	{ title: '0-0-1-0', key: '0-0-1-0' },
	{ title: '0-0-1-1', key: '0-0-1-1' },
	{ title: '0-0-1-2', key: '0-0-1-2' }
];

class Visor extends Component {
	state = {
		visible: false,
		expandedKeys: [],
		autoExpandParent: true,
		checkedKeys: [],
		selectedKeys: [],
		submenu: 'rb_layers'
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

	onExpand = (expandedKeys) => {
		console.log('onExpand', expandedKeys);
		// if not set autoExpandParent to false, if children expanded, parent can not collapse.
		// or, you can remove all expanded children keys.
		this.setState({
			expandedKeys,
			autoExpandParent: false
		});
	};

	onCheck = (checkedKeys) => {
		console.log('onCheck', checkedKeys);
		this.setState({ checkedKeys });
	};

	onSelect = (selectedKeys, info) => {
		console.log('onSelect', info);
		this.setState({ selectedKeys });
	};

	renderTreeNodes = (data) => {
		return data.irrigation.map((item, index) => {
			return <TreeNodeWrapper showIcon={false} title={item.name} key={`irrigation${index}`} dataRef={item} />;
		});
	};

	handleChangeSubMenu = (e) => {
		this.setState({ submenu: e.target.value });
	};

	// renderModules = (module, index) => {
	// 	console.log(module, index);
	// 	let key = `sub${index}`;
	// 	return (
	// 		<SubMenu
	// 			mode="vertical"
	// 			key={key}
	// 			title={
	// 				<span>
	// 					<IconIrrigation />
	// 					<span>{module.title}</span>
	// 				</span>
	// 			}
	// 		>
	// 			<SubMenuWrapper
	// 				key="sub2"
	// 				title={
	// 					<span>
	// 						<IconTabs />
	// 						<span>Capas</span>
	// 					</span>
	// 				}
	// 			>
	// 				<br />
	// 				{module.layers.map((item, indexs) => {
	// 					return (
	// 						<Layers>
	// 							<Col xs={20}>{item.name} </Col>
	// 							<Col xs={4}>
	// 								<Switch
	// 									checkedChildren={<Icon type="check" />}
	// 									unCheckedChildren={<Icon type="cross" />}
	// 									defaultChecked
	// 									size="small"
	// 								/>{' '}
	// 							</Col>
	// 						</Layers>
	// 					);
	// 				})}
	// 				<br />
	// 			</SubMenuWrapper>
	// 		</SubMenu>
	// 	);
	// };

	render() {
		const modules = Modules;
		return (
			<LayoutWrapper>
				<Layout>
					<Content>
						<MenuUnfold onClick={this.showDrawer} type="menu-unfold" />
						<Map />
					</Content>
				</Layout>
				<Drawer
					width={300}
					placement="left"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<Row>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Riego">
								<Button shape="circle" size="large" className="active">
									<ImgInversion src={IrrigationImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Inverciones">
								<Button shape="circle" size="large">
									<ImgInversion src={MoneyBagImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Maquinarias">
								<Button shape="circle" size="large">
									<ImgInversion src={TractorImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Costa Norte">
								<Button shape="circle" size="large">
									<ImgInversion src={CoastImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Tarea Vida">
								<Button shape="circle" size="large">
									<ImgInversion src={CareImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
					</Row>
					<Divider dashed />
					<Row>
						<Col>
							<Radio.Group value={this.state.submenu} onChange={this.handleChangeSubMenu}>
								<Radio.Button value="rb_layers">
									<ImgSecondChoice src={LayersImg} alt="" /> Capas
								</Radio.Button>
								<Radio.Button value="rb_chart" disabled>
									<ImgSecondChoice src={PresentationImg} alt="" /> Datos
								</Radio.Button>
								<Radio.Button value="rb_info" disabled>
									<ImgSecondChoice src={QuestionImg} alt="" /> Info
								</Radio.Button>
							</Radio.Group>
							<Tree
								checkable
								onExpand={this.onExpand}
								expandedKeys={this.state.expandedKeys}
								autoExpandParent={this.state.autoExpandParent}
								onCheck={this.onCheck}
								checkedKeys={this.state.checkedKeys}
								onSelect={this.onSelect}
								selectedKeys={this.state.selectedKeys}
							>
								{this.renderTreeNodes(modules)}
							</Tree>
						</Col>
					</Row>
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
