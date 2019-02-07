import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Drawer, List, Button, Divider, Popover } from "antd";
import _ from "lodash";
import Agroproductividad from "./agroproductividad";
import ParcelasAfectadas from "./parcelasAfectadas";
import styled from "styled-components";

import { showActionData } from "./../../containers/Visor/actions";

import logoI from '../Icons/icons/informacionAfectacion.svg';

const Button1 = styled(Button)`
&.ant-btn {
  color: ${(props) => props.color};
  background-color: white;
  border-color: ${(props) => props.color};
}
  &.ant-btn:hover, &.ant-btn:focus {
    color: white;
    background-color: ${(props) => props.color};
    border-color: ${(props) => props.color};
}
`;

const DividerWrapper = styled(Divider)`
  &.ant-divider {
    margin: 0 !important;
    padding: 0;
  }
`;

const data = [
  {
    id: 0,
    text: "Agroproductividad en los suelos",
    color: 'red'
  },
  {
    id: 1,
    text: "Parcelas afectadas por tipo de uso",
    color: 'blue'
  },
  {
    id: 2,
    text: "Usufructuarios afectados",
    color: 'blue'
  },
  {
    id: 3,
    text: "Afectaciones por forma productiva",
    color: 'blue'
  },
  {
    id: 4,
    text: "Área de ascenso del nivel medio del mar",
    color: 'green'
  }
];

function addItem(item, array) {
  let dif = _.difference([item], array);
  if (dif.length) {
    array.push(item);
  }
  return array;
}
class TareaVida extends Component {
  state = { 
    visible: false, 
    view: null, 
    arrayAfectaciones: [] 
  };

  componentWillReceiveProps = nextProps => {
    const { layers } = this.props;
    let dif = _.difference(layers, nextProps.layers);
    let dif1 = _.difference(nextProps.layers, layers);
    if (dif.length || dif1.length) {
      let arrayAfectaciones = [];
      nextProps.layers.map(item => {
        switch (item) {
          case "Polígonos de suelo afectado":
            arrayAfectaciones = addItem(data[0], arrayAfectaciones);
            break;

          case "Parcelas agrícolas afectadas":
            arrayAfectaciones = addItem(data[1], arrayAfectaciones);
            arrayAfectaciones = addItem(data[2], arrayAfectaciones);
            arrayAfectaciones = addItem(data[3], arrayAfectaciones);
            break;

          case "Ascenso del nivel medio del mar":
            arrayAfectaciones = addItem(data[4], arrayAfectaciones);
            break;

          default:
            break;
        }
      });
      this.setState({ arrayAfectaciones });
    }
  };

  showDrawer = view => {
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

  selectedRows = (municipio, selectedRows) => {
    this.props.show({
      name: "Polígonos de suelo afectado",
      data: selectedRows,
      municipio
    });
  };

  infoAfectacion = (parametro) => {
		return (
			<div>
				<p>{this.infoAfectacionAux(parametro)}</p>
			</div>
		);
	};

	infoAfectacionAux = (parametroAux) => {
		switch (parametroAux) {
			case 'Agroproductividad en los suelos':
				return 'Esta es la Afectación correspondiente a Agroproductividad en los suelos';

			case 'Parcelas afectadas por tipo de uso':
				return 'Esta es la Afectación correspondiente a Parcelas afectadas por tipo de uso';

			case 'Afectaciones por forma productiva':
				return 'Esta es la Afectación correspondiente a Afectaciones por forma productiva';

			case 'Usufructuarios afectados':
				return 'Esta es la Afectación correspondiente a Usufructuarios afectados';

			case 'Ascenso del nivel medio del mar':
				return 'Esta es la Afectación correspondiente a Ascenso del nivel medio del mar';

			default:
				break;
		}
	};

  render() {
    return (
      <div>
        {this.state.arrayAfectaciones.length ? (
          <div>
            <DividerWrapper dashed orientation="left">
              {" "}
              Afectaciones{" "}
            </DividerWrapper>
            <List
              size="small"
              dataSource={this.state.arrayAfectaciones}
              renderItem={item => (
                <List.Item key={item.id}>
                  <div style={{ width: "100%" }}>
                    <span
                      style={{
                        float: "left"
                      }}
                    >
                      {item.text}
                    </span>
                    <Button1
                      //disabled={item.id !== 0}
                      onClick={this.showDrawer.bind(this, item.id)}
                      size="small"
                      style={{
                        float: "right"
                      }}
                      type="primary"
                      shape="circle"
                      icon="area-chart"
                      color={item.color}
                    />
                    {/* <Popover
											title={item.text}
											content={this.infoAfectacion(item.text)}
											trigger="click"
										>
											<img
												style={{
													float: 'right',
													cursor: 'pointer',
													height: '1.6vmin',
													marginTop: '0.4em',
													marginRight: '0.5em'
												}}
												src={logoI}
											/>
										</Popover> */}
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : null}

        <Drawer
          width={450}
          mask={false}
          maskClosable={false}
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {this.state.view === 0 ? (
            <Agroproductividad
              selectedRows={this.selectedRows}
              add={this.props.add}
            />
          ) : null}

          {this.state.view === 1 ? (
            <ParcelasAfectadas
              selectedRows={this.selectedRows}
              add={this.props.add}
            />
          ) : null}

        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, {
  show: showActionData
});

export default compose(withConnect)(TareaVida);
