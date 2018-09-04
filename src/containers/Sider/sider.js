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
	Select,
	Divider,
	Radio,
	Alert,
	Badge,
	Menu,
	Breadcrumb,
	Modal
} from 'antd';

import { selectModules, addLayers, delLayers } from './actions';
import makeSelectSider from './selectors';
import Modules from './../../data/index';
import React, { Component } from 'react';
import reducer from './reducer';
import saga from './saga';
import styled from 'styled-components';
import withReducer from '../../utils/withReducer';
import withSaga from '../../utils/withSaga';

import { CapabilitiesUtil } from '@terrestris/react-geo';
import OlImageWms from 'ol/source/imagewms';
import OlLayerImage from 'ol/layer/image';

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

const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const { Sider } = Layout;

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
	margin: -1px 10px 0px 10px;
`;

const SiderWrapper = styled(Sider)`
	&.ant-layout-sider{
		position: absolute;
		left: 0px;
		z-index: 2000;
		height: 100vh;
	}
	.ant-layout-sider-zero-width-trigger{
		z-index: 2000;
		top: 0px;
	}
`;

const nodo_services = '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';
const nodos = [
	{
		name: 'IDEPA Nacional',
		url: 'http://ide.enpa.minag:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Isla de la Juventud',
		url: 'http://geoservicios.enpa.iju.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Pinar del Rio',
		url: 'http://geoservicios.enpa.pri.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Habana',
		url: 'http://enpa.hab.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Matanzas',
		url: 'http://geoservicios.enpa.mtz.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Villa Clara',
		url: 'http://geoservicios.enpa.vcl.minag.cu/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Cienfuegos',
		url: 'http://geoservicios.enpa.cfg.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Sancti Spíritus',
		url: 'http://geoservicios.enpa.ssp.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Ciego de Ávila',
		url: 'http://geoservicios.enpa.cav.minag.cu/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Camagüey',
		url: 'http://geoservicios.enpa.cmg.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Las Tunas',
		url: 'http://geoservicios.enpa.ltu.minag.cu/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Holgüin',
		url: 'http://geoservicios.enpa.hlg.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Granma',
		url: 'http://geoservicios.enpa.grm.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Santiago de Cuba',
		url: 'http://geoservicios.enpa.scu.minag.cu:8080/geoserver/cuba/wms'
	},
	{
		name: 'IDEPA UEB Guantánamo',
		url: 'http://geoservicios.enpa.gtm.minag.cu/geoserver/cuba/wms'
	}
];

const buildTree = (layer, data) => {
	if (!layer.Layer) {
		return new OlLayerImage({
			opacity: 1,
			title: layer.Title,
			name: layer.name,
			abstract: layer.Abstract,
			getFeatureInfoUrl: data.getFeatureInfoUrl,
			getFeatureInfoFormats: data.wmsGetFeatureInfoConfig.Format,
			queryable: layer.queryable,
			source: new OlImageWms({
				url: data.getMapUrl,
				attributions: data.wmsAttribution,
				params: {
					LAYERS: layer.Name,
					VERSION: data.wmsVersion
				}
			})
		});
	} else {
		let aux = {
			title: layer.Title,
			layers: layer.Layer.map((item) => {
				return buildTree(item, data);
			})
		};
		return aux;
	}
};

const getLayersFromWmsCapabilties = (capabilities) => {
	let nameField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Name';
	let wmsVersion = capabilities.version;
	let wmsAttribution = capabilities.Service.AccessConstraints;
	let layersInCapabilities = capabilities.Capability.Layer.Layer;
	let wmsGetMapConfig = capabilities.Capability.Request.GetMap;
	let wmsGetFeatureInfoConfig = capabilities.Capability.Request.GetFeatureInfo;
	let getMapUrl = wmsGetMapConfig.DCPType[0].HTTP.Get.OnlineResource;
	let getFeatureInfoUrl = wmsGetFeatureInfoConfig.DCPType[0].HTTP.Get.OnlineResource;

	let data = {
		nameField,
		wmsVersion,
		wmsAttribution,
		layersInCapabilities,
		wmsGetMapConfig,
		wmsGetFeatureInfoConfig,
		getMapUrl,
		getFeatureInfoUrl
	};

	const layers = layersInCapabilities.map(function(layerObj) {
		return buildTree(layerObj, data);
	});
	return layers;
};

class SiderComponent extends Component {
	state = {
		expandedKeys: [],
		autoExpandParent: true,
		checkedKeys: [],
		selectedKeys: [],
		submenu: 'rb_layers',
		view: 1,
		display: 1,
		nodo: nodos[1].url,
		layers: [],
		modal: false
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
		if (string === 1 || string === 2) {
			this.setState({ view: string });
		} else {
			this.setState({ view: 0 });
			this.props.selectModule(string);
		}
	};

	countLayers = (layer) => {
		const { sider: { layers } } = this.props;
		if (typeof layers[layer] !== 'undefined') {
			return layers[layer].length;
		}
		return 1;
	};

	renderBreadcrumb = (item) => {
		let aux;
		switch (item) {
			case 'investments':
				aux = (
					<a href="#" style={{ fontSize: 15 }}>
						<ImgInversionV src={MoneyBagImg} alt="" />Inverciones
					</a>
				);
				break;
			case 'irrigation':
				aux = (
					<a href="#" style={{ fontSize: 15 }}>
						<ImgInversionV src={IrrigationImg} alt="" />Riego
					</a>
				);
				break;
			case 'machinery':
				aux = (
					<a href="#" style={{ fontSize: 15 }}>
						<ImgInversionV src={TractorImg} alt="" />Maquinarias
					</a>
				);
				break;
			case 'northCoast':
				aux = (
					<a href="#" style={{ fontSize: 15 }}>
						<ImgInversionV src={CoastImg} alt="" />Costa Norte
					</a>
				);
				break;
			case 2:
				aux = (
					<a href="#" style={{ fontSize: 15 }}>
						<ImgInversionV src={MapImg} alt="" />Nodos IDE
					</a>
				);
				break;
			default:
				aux = (
					<a href="#" style={{ fontSize: 15 }}>
						<ImgInversionV src={CareImg} alt="" />Tarea Vida
					</a>
				);
				break;
		}

		return (
			<Row style={{ marginBottom: 20 }}>
				<Breadcrumb separator=">">
					<Breadcrumb.Item onClick={this.handleChangeModule.bind(this, 1)}>
						<a href="#" style={{ fontSize: 15 }}>
							<Icon type="menu-fold" /> Menu
						</a>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{aux}</Breadcrumb.Item>
				</Breadcrumb>
			</Row>
		);
	};

	handleChange = (value) => {
		this.state.nodo = value;
	};

	addNodo = () => {
		const _this = this;
		const { nodo } = this.state;
		let nodoUrl = `${nodo}${nodo_services}`;
		CapabilitiesUtil.parseWmsCapabilities(nodoUrl)
			.then((response) => {
				let nlayers = getLayersFromWmsCapabilties(response);
				_this.setState({
					layers: nlayers
				});
			})
			.catch(() => alert('Could not parse capabilities document.'));
	};

	showModal = () => {
		this.setState({
			modal: true
		});
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			modal: false
		});
	};

	render() {
		const modules = Modules;
		const { sider: { item, layers }, collapsed, onCollapse } = this.props;
		console.log(item);
		return (
			<SiderWrapper
				width={250}
				theme="light "
				collapsedWidth={0}
				collapsible
				collapsed={collapsed}
				onCollapse={onCollapse}
			>
				<Logo />
				<Divider dashed style={{ margin: '5px 0 0 0' }} />
				<Animate visible={this.state.view === 1}>
					<MenuWrapper onClick={this.handleClick} mode="inline">
						<Menu.Item key="1" onClick={this.handleChangeModule.bind(this, 'investments')}>
							<Badge
								style={{ right: -30 }}
								count={typeof layers['investments'] !== 'undefined' ? layers['investments'].length : 0}
							>
								<ImgInversion src={MoneyBagImg} alt="" />
								<span>Inverciones</span>
							</Badge>
						</Menu.Item>
						<Menu.Item key="2" onClick={this.handleChangeModule.bind(this, 'irrigation')}>
							<Badge
								style={{ right: -30 }}
								count={typeof layers['irrigation'] !== 'undefined' ? layers['irrigation'].length : 0}
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
								count={typeof layers['northCoast'] !== 'undefined' ? layers['northCoast'].length : 0}
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
						<Badge style={{ right: -30 }} count={0}>
							<Button style={{ marginLeft: 19 }} type="primary" onClick={this.showModal}>
								<ImgInversion style={{ marginTop: 0 }} src={MapImg} alt="" />
								<span>Añadir mapas/Nodos IDE</span>
							</Button>
						</Badge>
					</MenuWrapper>
				</Animate>
				<Animate style={{ padding: 10 }} visible={this.state.view === 0}>
					{this.renderBreadcrumb(item)}
					{item && modules[item].length ? (
						<Col>
							<Radio.Group value={this.state.submenu} onChange={this.handleChangeSubMenu}>
								<Radio.Button size="small" value="rb_layers">
									<ImgSecondChoice src={LayersImg} alt="" />
								</Radio.Button>
								<Radio.Button value="rb_chart" disabled>
									<ImgSecondChoice src={PresentationImg} alt="" />
								</Radio.Button>
								<Radio.Button value="rb_info" disabled>
									<ImgSecondChoice src={QuestionImg} alt="" />
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
						<Alert message="No hay capas disponibles" type="info" showIcon />
					) : null}
				</Animate>
				<Animate style={{ padding: 10 }} visible={this.state.view === 2}>
					{this.renderBreadcrumb(2)}

					<Row>
						<Col xs={24}>
							<h3>Adicionar Nodos IDE</h3>
						</Col>
						<Col xs={20}>
							<Select
								defaultValue={this.state.nodo}
								style={{ width: '100%' }}
								onChange={this.handleChange}
							>
								{nodos.map((val) => {
									return <Option value={val.url}>{val.name}</Option>;
								})}
							</Select>
						</Col>
						<Col xs={4}>
							<Button type="primary" icon="plus-circle-o" onClick={this.addNodo} />
						</Col>
					</Row>
				</Animate>
			</SiderWrapper>
		);
	}
}

SiderComponent.defaultProps = {
	sider: {
		item: null,
		layers: []
	}
};

SiderComponent.propTypes = {};

const mapStateToProps = createStructuredSelector({
	sider: makeSelectSider()
});

const withConnect = connect(mapStateToProps, {
	selectModule: selectModules,
	add: addLayers,
	del: delLayers
});

export default compose(withConnect, withSaga({ key: 'sider', saga }), withReducer({ key: 'sider', reducer }))(
	SiderComponent
);
