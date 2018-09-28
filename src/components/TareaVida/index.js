import React, { Component } from 'react';
import { Drawer, List, Button, message } from 'antd';
import Agroproductividad from './agroproductividad';

export default class TareaVida extends Component {
	state = { visible: false, view: null };

	showDrawer = (view) => {
		this.setState({
			visible: true,
			view
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};
	render() {
		const data = [
			{
				id: 0,
				text: 'Agroproductividad en los suelos'
			},
			{
				id: 1,
				text: 'Parcelas afectadas por tipo de uso'
			},
			{
				id: 2,
				text: 'Usufructuarios afectados'
			},
			{
				id: 3,
				text: 'Afectaciones por forma productiva'
			},
			{
				id: 4,
				text: 'Área de ascenso del nivel medio del mar'
			}
		];
		return (
			<div style={{ marginTop: 20 }}>
				<List
					size="small"
					dataSource={data}
					renderItem={(item) => (
						<List.Item key={item.id}>
							<div style={{ width: '100%' }}>
								<span
									style={{
										float: 'left'
									}}
								>
									{item.text}
								</span>
								<Button
									disabled={item.id !== 0}
									onClick={this.showDrawer.bind(this, item.id)}
									size="small"
									style={{
										float: 'right'
									}}
									type="primary"
									shape="circle"
									icon="area-chart"
								/>
							</div>
						</List.Item>
					)}
				/>

				<Drawer
					width={450}
					placement="right"
					closable={true}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					{this.state.view === 0 ? <Agroproductividad /> : null}
				</Drawer>
			</div>
		);
	}
}
