import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Drawer, List, Button, Divider } from "antd";
import _ from "lodash";
import Agroproductividad from "./agroproductividad";
import styled from "styled-components";

import { showActionData } from "./../../containers/Visor/actions";

const DividerWrapper = styled(Divider)`
  &.ant-divider {
    margin: 0 !important;
    padding: 0;
  }
`;

const data = [
  {
    id: 0,
    text: "Agroproductividad en los suelos"
  },
  {
    id: 1,
    text: "Parcelas afectadas por tipo de uso"
  },
  {
    id: 2,
    text: "Usufructuarios afectados"
  },
  {
    id: 3,
    text: "Afectaciones por forma productiva"
  },
  {
    id: 4,
    text: "Área de ascenso del nivel medio del mar"
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
  state = { visible: false, view: null, arrayAfectaciones: [] };

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
                    <Button
                      disabled={item.id !== 0}
                      onClick={this.showDrawer.bind(this, item.id)}
                      size="small"
                      style={{
                        float: "right"
                      }}
                      type="primary"
                      shape="circle"
                      icon="area-chart"
                    />
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : null}

        <Drawer
          width={410}
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
