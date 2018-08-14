import React, { Component } from 'react';
import styled from 'styled-components';
import { List, Badge } from 'antd';

const LegendDiv = styled.div`
	position: absolute;
	bottom: 10px;
	left: ${(props) => (props.drawer ? '310px' : '10px')};
	background-color: transparent;
	width: auto;
`;
const ColorDiv = styled.div`
	background-color: rgb(82, 196, 26);
	width: 10px;
	height: 10px;
	border-radius: 50%;
	margin: 5px 10px 0 0px;
`;
const ListWrapper = styled(List)`
   &.ant-list-sm .ant-list-item {
        padding: 0;
        font-weight: 500;
        color: #000;
    }
`;

export class Legend extends Component {
	render() {
		const { layers, drawer } = this.props;
		console.log(layers);
		return (
			<LegendDiv drawer={drawer}>
				<ListWrapper
					size="small"
					dataSource={layers}
					renderItem={(item) => {
						return (
							<List.Item>
								<ColorDiv style={{ backgroundColor: item.item.color }} />
								{item.item.name}
							</List.Item>
						);
					}}
				/>
			</LegendDiv>
		);
	}
}

export default Legend;
