import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import Map from './../../components/Map';
import Modules from './../../data/index';
import { Layout, Tree, Icon, Row, Col, Button, Drawer, Tooltip, Divider, Radio, Alert, Badge } from 'antd';

import withReducer from '../../utils/withReducer';
import withSaga from '../../utils/withSaga';

import makeSelectSider from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectModules, addLayers, delLayers } from './actions';

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
		visible: false,
		expandedKeys: [],
		autoExpandParent: true,
		checkedKeys: [],
		selectedKeys: [],
		submenu: 'rb_layers'
	};

	componentWillReceiveProps = (nextProps) => {
		const { sider } = this.props;
		if (nextProps.sider.item !== sider.item) {
			this.setState({ checkedKeys: nextProps.sider.layers[nextProps.sider.item] });
		}
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
		this.props.selectModule(string);
	};

	countLayers = (layer) => {
		const { sider: { layers } } = this.props;
		if (typeof layers[layer] !== 'undefined') {
			return layers[layer].length;
			console.log(layers[layer].length);
		}
		console.log('undefine');
		return 1;
	};

	render() {
		const modules = Modules;
		const { sider: { item, layers } } = this.props;

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
					maskClosable={false}
					mask={false}
				>
					<Row>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Riego">
								<Badge
									count={
										typeof layers['irrigation'] !== 'undefined' ? layers['irrigation'].length : 0
									}
								>
									<Button
										onClick={this.handleChangeModule.bind(this, 'irrigation')}
										className={item === 'irrigation' ? 'active' : null}
										shape="circle"
										size="large"
									>
										<ImgInversion src={IrrigationImg} alt="" />
									</Button>
								</Badge>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Inverciones">
								<Badge
									count={
										typeof layers['investments'] !== 'undefined' ? layers['investments'].length : 0
									}
								>
									<Button
										onClick={this.handleChangeModule.bind(this, 'investments')}
										className={item === 'investments' ? 'active' : null}
										shape="circle"
										size="large"
									>
										<ImgInversion src={MoneyBagImg} alt="" />
									</Button>
								</Badge>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Maquinarias">
								<Badge
									count={typeof layers['machinery'] !== 'undefined' ? layers['machinery'].length : 0}
								>
									<Button
										onClick={this.handleChangeModule.bind(this, 'machinery')}
										className={item === 'machinery' ? 'active' : null}
										shape="circle"
										size="large"
									>
										<ImgInversion src={TractorImg} alt="" />
									</Button>
								</Badge>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Costa Norte">
								<Badge
									count={
										typeof layers['northCoast'] !== 'undefined' ? layers['northCoast'].length : 0
									}
								>
									<Button
										onClick={this.handleChangeModule.bind(this, 'northCoast')}
										className={item === 'northCoast' ? 'active' : null}
										shape="circle"
										size="large"
									>
										<ImgInversion src={CoastImg} alt="" />
									</Button>
								</Badge>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Tarea Vida">
								<Badge
									count={typeof layers['lifeTask'] !== 'undefined' ? layers['lifeTask'].length : 0}
								>
									<Button
										onClick={this.handleChangeModule.bind(this, 'lifeTask')}
										className={item === 'lifeTask' ? 'active' : null}
										shape="circle"
										size="large"
									>
										<ImgInversion src={CareImg} alt="" />
									</Button>
								</Badge>
							</Tooltip>
						</Col>
					</Row>
					<Divider dashed />
					<Row>
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
							<Alert message="No existe información para mostrar" type="info" showIcon />
						) : null}
					</Row>
					{this.state.visible ? (
						<ButtonClose onClick={this.onClose} type="primary" shape="circle" icon="close" />
					) : null}
				</Drawer>
			</LayoutWrapper>
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
