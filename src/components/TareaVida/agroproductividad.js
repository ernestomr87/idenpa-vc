import React, { Component } from 'react';
import { Table, Tabs, message } from 'antd';
import { fetchAgroproductividad } from './../../services';
import styled from 'styled-components';
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';

const TabPane = Tabs.TabPane;

const P = styled.p`
	const: 500;
	font-size: 16px;
	color: rgba(0, 0, 0, 0.85);
	display: block;
	font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	margin-bottom: 15px;
`;

const Div = styled.div``;

export default class Agroproductividad extends Component {
	state = {
		collection: null,
		total: null,
		selectedTotalRowKeys: [],
		selectedMunicipioRowKeys: [],
		selectedTab: 1
	};

	componentWillMount = () => {
		this.fetchData();
	};

	fetchData = () => {
		const _this = this;
		fetchAgroproductividad()
			.then(function(response) {
				let collection = {};
				let total = {
					1: 0,
					2: 0,
					3: 0,
					4: 0
				};
				response.data.forEach((element) => {
					if (element.municipio !== '0') {
						if (!collection[element.municipio]) {
							collection[element.municipio] = [];
						}
						collection[element.municipio].push(element);
						total[parseInt(element.cat_agrop)] = total[element.cat_agrop] + element.sum;
					}
				});
				console.log(collection);
				_this.setState({
					collection,
					total
				});
			})
			.catch(function(error) {
				// handle error
				message.error(error.message);
			});
	};

	renderTotal = () => {
		const { total, selectedTotalRowKeys } = this.state;
		const rowSelection = {
			selectedTotalRowKeys,
			onChange: this.onSelectTotalChange
		};
		const dataSource = [];
		if (total) {
			Object.keys(total).forEach(function(key) {
				let text = null;
				switch (key) {
					case '1':
						text = 'I';
						break;
					case '2':
						text = 'II';
						break;
					case '3':
						text = 'III';
						break;
					case '4':
						text = 'IV';
						break;
					default:
						break;
				}
				dataSource.push({ key: text, value: total[key] });
			});

			const columns = [
				{
					title: 'Categoría',
					dataIndex: 'key',
					key: 'key',
					align: 'center'
				},
				{
					title: 'Área (ha)',
					dataIndex: 'value',
					key: 'value',
					align: 'center'
				}
			];

			const scale = {
				key: { alias: 'Categorías' },
				value: { alias: 'Valores' }
			};
			return (
				<div>
					<Table
						pagination={false}
						rowSelection={rowSelection}
						bordered={true}
						size="small"
						dataSource={dataSource}
						columns={columns}
					/>
					<Div>
						<Chart height={290} data={dataSource} scale={scale} forceFit>
							<Axis title name="categorías" />
							<Axis title name="valores" />
							<Tooltip crosshairs={{ type: 'rect' }} />
							<Geom type="interval" position="key*value" color="value" />
						</Chart>
					</Div>
				</div>
			);
		}
	};

	renderMunicipio = (municipio) => {
		const { collection, selectedMunicipioRowKeys } = this.state;
		const rowSelection = {
			selectedMunicipioRowKeys,
			onChange: this.onSelectMunicipioChange
		};

		if (collection) {
			const dataSource = collection[municipio];
			dataSource.map((item) => {
				switch (item.cat_agrop) {
					case '1':
						item.cat_agrop = 'I';
						break;
					case '2':
						item.cat_agrop = 'II';
						break;
					case '3':
						item.cat_agrop = 'III';
						break;
					case '4':
						item.cat_agrop = 'IV';
						break;
					default:
						break;
				}
			});
			const columns = [
				{
					title: 'Categoría',
					dataIndex: 'cat_agrop',
					key: 'cat_agrop',
					align: 'center'
				},
				{
					title: 'Área (ha)',
					dataIndex: 'sum',
					key: 'sum',
					align: 'center'
				}
			];

			const scale = {
				cat_agrop: { alias: 'Categorías' },
				sum: { alias: 'Valores' }
			};
			return (
				<div>
					<Table
						pagination={false}
						rowSelection={rowSelection}
						bordered={true}
						size="small"
						dataSource={dataSource}
						columns={columns}
					/>
					<Div>
						<Chart height={290} data={dataSource} scale={scale} forceFit>
							<Axis title name="categorías" />
							<Axis title name="valores" />
							<Tooltip crosshairs={{ type: 'rect' }} />
							<Geom type="interval" position="cat_agrop*sum" color="sum" />
						</Chart>
					</Div>
				</div>
			);
		}
	};

	onSelectMunicipioChange = (selectedMunicipioRowKeys) => {
		console.log('selectedRowKeys changed: ', selectedMunicipioRowKeys);
		this.setState({ selectedMunicipioRowKeys });
	};

	onSelectTotalChange = (selectedTotalRowKeys) => {
		this.changeLayer('total', selectedTotalRowKeys);
		this.setState({ selectedTotalRowKeys });
	};

	changeTab = (key) => {
		console.log(key);
	};

	changeLayer = (type, rows) => {
		if (type === 'total') {
			rows.map((item) => {
				console.log(this.state.total[item]);
			});
		}
	};

	render() {
		return (
			<div>
				<P>Agroproductividad en los suelos</P>

				<Tabs defaultActiveKey={this.state.selectedTab} onChange={this.changeTab}>
					<TabPane tab="Total" key={1}>
						{this.renderTotal()}
					</TabPane>
					<TabPane tab="Sagua la Grande" key={2}>
						{this.renderMunicipio('Sagua la Grande')}
					</TabPane>
					<TabPane tab="Encrucijada" key={3}>
						{this.renderMunicipio('Encrucijada')}
					</TabPane>
					<TabPane tab="Caibarién" key={4}>
						{this.renderMunicipio('Caibarién')}
					</TabPane>
					<TabPane tab="Camajuaní" key={5}>
						{this.renderMunicipio('Camajuaní')}
					</TabPane>
				</Tabs>
			</div>
		);
	}
}
