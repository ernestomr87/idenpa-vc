import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	Layout,
	Tree,
	Icon,
	Row,
	Col,
	Button,
	Drawer,
	Tooltip,
	Divider,
	Radio,
	Alert,
	Badge,
	Menu,
	Breadcrumb
} from 'antd';
import { selectModules, addLayers, delLayers } from './actions';
import makeSelectSider from './selectors';
import Modules from './../../data/index';
import React, { Component } from 'react';
import reducer from './reducer';
import saga from './saga';
import styled, { keyframes } from 'styled-components';
import withReducer from '../../utils/withReducer';
import withSaga from '../../utils/withSaga';
import { bounceInLeft, bounceOutLeft, fadeInRight } from 'react-animations';

import {
	CareImg,
	CoastImg,
	IrrigationImg,
	LayersImg,
	MoneyBagImg,
	PresentationImg,
	QuestionImg,
	TractorImg,
	MapImg
} from './../../components/Icons';

import Logo from './../../components/Logo';

const bounceInLeftAnimation = keyframes`${fadeInRight}`;
const bounceOutLeftAnimation = keyframes`${bounceOutLeft}`;

const { Content } = Layout;
const TreeNode = Tree.TreeNode;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const TreeNodeWrapper = styled(TreeNode)`
	.ant-tree-switcher{
		display: none !important;
	}`;

const MenuWrapper = styled(Menu)`
	&.ant-menu-inline .ant-menu-item:not(:last-child) {
		margin: 0px;
	}
	&.ant-menu-inline .ant-menu-item{
		margin: 0px;
	}
	`;

const MenuUnfold = styled(Icon)`
	&.anticon{
		font-size: 35px;
		color: rgb(91, 120, 77);
		position: absolute;
		z-index: 1000;
		left: 10px;
		top: 10px;
		cursor: pointer;
	}	
	&.anticon:hover{
		transform: scale(1.05, 1.05)
	}	
`;
const ImgInversion = styled.img`
	width: 20px;
	height: 20px;
	margin-top: -5px;
	margin-right: 10px;
	float: left;
`;

const ImgInversionV = styled.img`
	width: 15px;
	height: 15px;
	margin-top: -2px;
	margin-right: 3px;
`;

const Animate = styled.div`display: ${(props) => (props.visible ? 'block' : 'none')};`;

const ImgSecondChoice = styled.img`
	width: 20px;
	height: 20px;
	margin-top: -5px;
	margin-left: -10px;
`;

const ButtonClose = styled(Button)`
	&.ant-btn{
		position: absolute;
		top: 0px;
		right: -15px;
		background-color: #fd5d65;
		border-color: #fff;
	}

	&.ant-btn:hover{
		background-color: #fd5d65;
		border-color: #fff;
	}

	&.ant-btn.element-animation{
		background-color: #fd5d65;
		border-color: #fff;
		animation: animationFrames linear 3s;
		animation-iteration-count: 1;
		transform-origin: 50% 50%;
	  }
	  
	  @keyframes animationFrames{
		0% {
		  transform:  translate(0px,0px)  rotate(0deg) ;
		}
		100% {
		  transform:  translate(-52px,3px)  rotate(180deg) ;
		}
	  }
	  
`;

class Sider extends Component {
	state = {
		expandedKeys: [],
		autoExpandParent: true,
		checkedKeys: [],
		selectedKeys: [],
		submenu: 'rb_layers',
		view: 1,
		display: 1
	};

	componentWillReceiveProps = (nextProps) => {
		const { sider } = this.props;
		if (nextProps.sider.item !== sider.item) {
			this.setState({ checkedKeys: nextProps.sider.layers[nextProps.sider.item] });
		}
	};

	onCheck = (checkedKeys) => {
		const { sider: { item }, add } = this.props;
		add({ item, checkedKeys });
		this.setState({ checkedKeys });
	};

	renderTreeNodes = (data) => {
		const { sider: { item } } = this.props;
		if (!item) return;
		return data[item].map((item, index) => {
			return <TreeNodeWrapper title={item.name} key={item.name} dataRef={item} />;
		});
	};

	handleChangeSubMenu = (e) => {
		this.setState({ submenu: e.target.value });
	};

	handleChangeModule = (string) => {
		if (string !== 'map') {
			if (string === 1) {
				this.setState({ view: 1 });
			} else {
				this.setState({ view: 0 });
				this.props.selectModule(string);
			}
		}
	};

	countLayers = (layer) => {
		const { sider: { layers } } = this.props;
		if (typeof layers[layer] !== 'undefined') {
			return layers[layer].length;
		}
		return 1;
	};

	render() {
		const modules = Modules;
		const { sider: { item, layers }, visible, showDrawer, onClose } = this.props;

		return (
			<Layout>
				<Content>
					<MenuUnfold onClick={showDrawer} type="menu-unfold" />
				</Content>
				<Drawer
					placement="left"
					closable={false}
					onClose={onClose}
					visible={visible}
					maskClosable={false}
					mask={false}
					style={{ boxShadow: '0 2px 8px #f0f1f2', padding: '10px 0 10px 0', height: '100%' }}
				>
					<Logo />
					<Divider dashed style={{ margin: '10px 0' }} />

					<Animate visible={this.state.view === 1}>
						<MenuWrapper onClick={this.handleClick} mode="inline">
							<Menu.Item key="1" onClick={this.handleChangeModule.bind(this, 'investments')}>
								<Badge
									style={{ right: -30 }}
									count={
										typeof layers['investments'] !== 'undefined' ? layers['investments'].length : 0
									}
								>
									<ImgInversion src={MoneyBagImg} alt="" />
									<span>Inverciones</span>
								</Badge>
							</Menu.Item>
							<Menu.Item key="2" onClick={this.handleChangeModule.bind(this, 'irrigation')}>
								<Badge
									style={{ right: -30 }}
									count={
										typeof layers['irrigation'] !== 'undefined' ? layers['irrigation'].length : 0
									}
								>
									<ImgInversion src={IrrigationImg} alt="" />
									<span>Riego</span>
								</Badge>
							</Menu.Item>
							<Menu.Item key="3" onClick={this.handleChangeModule.bind(this, 'machinery')}>
								<Badge
									style={{ right: -30 }}
									count={typeof layers['machinery'] !== 'undefined' ? layers['machinery'].length : 0}
								>
									<ImgInversion src={TractorImg} alt="" />
									<span>Maquinarias</span>
								</Badge>
							</Menu.Item>
							<Menu.Item key="4" onClick={this.handleChangeModule.bind(this, 'northCoast')}>
								<Badge
									style={{ right: -30 }}
									count={
										typeof layers['northCoast'] !== 'undefined' ? layers['northCoast'].length : 0
									}
								>
									<ImgInversion src={CoastImg} alt="" />
									<span>Costa Norte</span>
								</Badge>
							</Menu.Item>
							<Menu.Item key="5" onClick={this.handleChangeModule.bind(this, 'lifeTask')}>
								<Badge
									style={{ right: -30 }}
									count={typeof layers['lifeTask'] !== 'undefined' ? layers['lifeTask'].length : 0}
								>
									<ImgInversion src={CareImg} alt="" />
									<span>Tarea Vida</span>
								</Badge>
							</Menu.Item>
							<Divider dashed style={{ margin: '10px 0' }} />
							<Menu.Item key="6" onClick={this.handleChangeModule.bind(this, 'map')}>
								<Badge style={{ right: -30 }} count={0}>
									<ImgInversion src={MapImg} alt="" />
									<span>Añadir mapas/Nodos IDE</span>
								</Badge>
							</Menu.Item>
						</MenuWrapper>
					</Animate>
					<Animate style={{ padding: 10 }} visible={this.state.view === 0}>
						<Row style={{ marginBottom: 20 }}>
							<Breadcrumb separator=">">
								<Breadcrumb.Item onClick={this.handleChangeModule.bind(this, 1)}>
									<a href="#" style={{ fontSize: 15 }}>
										<Icon type="menu-fold" /> Menu
									</a>
								</Breadcrumb.Item>
								<Breadcrumb.Item>
									<a href="#" style={{ fontSize: 15 }}>
										<ImgInversionV src={IrrigationImg} alt="" />Inverciones
									</a>
								</Breadcrumb.Item>
							</Breadcrumb>
						</Row>
						{item && modules[item].length ? (
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
									onCheck={this.onCheck}
									checkedKeys={this.state.checkedKeys}
									selectedKeys={this.state.selectedKeys}
								>
									{this.renderTreeNodes(modules)}
								</Tree>
							</Col>
						) : item ? (
							<Alert message="No hay capas dispon" type="info" showIcon />
						) : null}
					</Animate>
					{visible ? <ButtonClose onClick={onClose} type="primary" shape="circle" icon="close" /> : null}
				</Drawer>
			</Layout>
		);
	}
}

Sider.defaultProps = {
	sider: {
		item: null,
		layers: []
	}
};

Sider.propTypes = {};

const mapStateToProps = createStructuredSelector({
	sider: makeSelectSider()
});

const withConnect = connect(mapStateToProps, {
	selectModule: selectModules,
	add: addLayers,
	del: delLayers
});

export default compose(withConnect, withSaga({ key: 'sider', saga }), withReducer({ key: 'sider', reducer }))(Sider);
