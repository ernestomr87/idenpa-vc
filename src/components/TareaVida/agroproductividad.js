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
		total: null
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
		const { total } = this.state;
		const dataSource = [];

		if (total) {
			Object.keys(total).forEach(function(key) {
				dataSource.push({ key: key, value: total[key] });
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
					<Table pagination={false} bordered={true} size="small" dataSource={dataSource} columns={columns} />
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
		const { collection } = this.state;

		if (collection) {
			const dataSource = collection[municipio];
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
					<Table pagination={false} bordered={true} size="small" dataSource={dataSource} columns={columns} />
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

	render() {
		return (
			<div>
				<P>Agroproductividad en los suelos</P>

				<Tabs defaultActiveKey="1">
					<TabPane tab="Total" key="1">
						{this.renderTotal()}
					</TabPane>
					<TabPane tab="Caibarién" key="2">
						{this.renderMunicipio('Caibarién')}
					</TabPane>
					<TabPane tab="Camajuaní" key="3">
						{this.renderMunicipio('Camajuaní')}
					</TabPane>
					<TabPane tab="Encrucijada" key="4">
						{this.renderMunicipio('Encrucijada')}
					</TabPane>
					<TabPane tab="Quemado de Güines" key="5">
						{this.renderMunicipio('Quemado de Güines')}
					</TabPane>
					<TabPane tab="Quemado de Güines" key="6">
						{this.renderMunicipio('Quemado de Güines')}
					</TabPane>
					<TabPane tab="Remedios" key="7">
						{this.renderMunicipio('Remedios')}
					</TabPane>
					<TabPane tab="Sagua la Grande" key="8">
						{this.renderMunicipio('Sagua la Grande')}
					</TabPane>
				</Tabs>
			</div>
		);
	}
}
