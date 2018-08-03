import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import Map from './../../components/Map';
import Modules from './../../data/index';
import { Layout, Tree, Icon, Row, Col, Button, Drawer, Tooltip, Divider, Radio, Alert } from 'antd';

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

	render() {
		const modules = Modules;
		const { sider: { item } } = this.props;

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
								<Button
									onClick={this.handleChangeModule.bind(this, 'irrigation')}
									className={item === 'irrigation' ? 'active' : null}
									shape="circle"
									size="large"
								>
									<ImgInversion src={IrrigationImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Inverciones">
								<Button
									onClick={this.handleChangeModule.bind(this, 'investments')}
									className={item === 'investments' ? 'active' : null}
									shape="circle"
									size="large"
								>
									<ImgInversion src={MoneyBagImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Maquinarias">
								<Button
									onClick={this.handleChangeModule.bind(this, 'machinery')}
									className={item === 'machinery' ? 'active' : null}
									shape="circle"
									size="large"
								>
									<ImgInversion src={TractorImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Costa Norte">
								<Button
									onClick={this.handleChangeModule.bind(this, 'northCoast')}
									className={item === 'northCoast' ? 'active' : null}
									shape="circle"
									size="large"
								>
									<ImgInversion src={CoastImg} alt="" />
								</Button>
							</Tooltip>
						</Col>
						<Col xs={4} style={{ margin: '0 4px' }}>
							<Tooltip placement="bottom" title="Tarea Vida">
								<Button
									onClick={this.handleChangeModule.bind(this, 'lifeTask')}
									className={item === 'lifeTask' ? 'active' : null}
									shape="circle"
									size="large"
								>
									<ImgInversion src={CareImg} alt="" />
								</Button>
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
