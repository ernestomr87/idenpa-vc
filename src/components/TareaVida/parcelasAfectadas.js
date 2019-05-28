import React, { Component } from "react";
import { Table, Tabs, message, Button, Row, Col, Modal } from "antd";
import _ from "lodash";
import {
  fetchParcelasAfectadas,
  fetchParcelasAfectadasByMun
} from "./../../services";
import styled from "styled-components";
import { Chart, Tooltip, Geom, Axis } from "bizcharts";

const TabPane = Tabs.TabPane;

const P = styled.p`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  display: block;
  font-family: "Monospaced Number", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
`;

const TabsWrapper = styled(Tabs)`
  &.ant-tabs-tab {
    margin: 0 !important;
  }
`;
const numberToLetter = number => {
  const letters = {
    10: "a",
    11: "b",
    12: "c",
    13: "d",
    14: "e",
    15: "f"
  };

  for (var j = 0; j < 6; j++) {
    if (number === Object.keys(letters)[j]) {
      number = Object.values(letters)[j];
      break;
    }
  }

  return number;
};

const getRandomColor = () => {
  let number;
  let color = "#";

  for (let i = 0; i < 6; i++) {
    number = Math.round(Math.random() * 15);

    // Change the number to the letter
    if (number > 9) {
      number = numberToLetter(number);
    }

    color += number;
  }

  return color;
};

const TableWrapper = styled(Table)`
  .ant-table {
    border: none;
  }
`;

export default class ParcelasAfectadas extends Component {
  state = {
    total: null,
    municipios: {},
    selectedTotalRowKeys: [],
    selectedMunicipioRowKeys: [],
    selectedTab: 1,
    selectedRowKeys: [],
    modalTotal: false
  };

  componentWillMount = () => {
    this.fetchTotalData();
    this.fetchMunData("SAGUA LA GRANDE");
    this.fetchMunData("Encrucijada");
    this.fetchMunData("CAIBARIEN");
    this.fetchMunData("CAMAJUANÍ");
  };

  fetchTotalData = () => {
    const _this = this;
    fetchParcelasAfectadas()
      .then(function (response) {
        _this.setState({
          total: response.data
        });
      })
      .catch(function (error) {
        // handle error
        message.error(error.message);
      });
  };

  fetchMunData = mun => {
    const _this = this;
    let municipios = this.state.municipios;
    fetchParcelasAfectadasByMun(mun)
      .then(function (response) {
        municipios[mun] = response.data;
        _this.setState({
          municipios: municipios
        });
      })
      .catch(function (error) {
        // handle error
        message.error(error.message);
      });
  };

  renderTotal = () => {
    const { total, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        this.props.selectedRows(null, selectedRows);
      }
    };

    const dataSource = [];
    if (total) {
      Object.keys(total).forEach(function (key) {
        let cat = total[key].nombre;
        let area = total[key].area;
        area = _.round(area, 2);
        dataSource.push({ key: cat, value: area });
      });

      const columns = [
        {
          title: "Nombre",
          dataIndex: "key",
          key: "nombre",
          align: "left"
        },
        {
          title: "Área (ha)",
          dataIndex: "value",
          key: "area",
          align: "rigth",
          width: "75px"
        }
      ];

      let max = 0;
      dataSource.forEach(function (obj) {
        if (obj.area > max) {
          max = obj.area;
        }
      });

      return (
        <div>
          <Row type="flex" justify="end">
            <Col span={6}>
              <Button
                onClick={() => this.setModalTotal(true)}
                style={{ marginBottom: 10 }}
                type="primary"
                icon="pie-chart"
              >
                Gráfico
              </Button>
            </Col>
          </Row>
          <TableWrapper
            style={{ border: "none" }}
            pagination={false}
            rowSelection={rowSelection}
            size="small"
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      );
    }
  };

  renderMunicipio = municipio => {
    const { municipios, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        this.props.selectedRows(municipio, selectedRows);
      }
    };

    const dataSource = [];
    if (municipios[municipio]) {
      Object.keys(municipios[municipio]).forEach(function (key) {
        let cat = municipios[municipio][key].nombre;
        let area = municipios[municipio][key].area;
        area = _.round(area, 2)
        dataSource.push({ key: cat, value: area });
      });

      const columns = [
        {
          title: "Nombre",
          dataIndex: "key",
          key: "nombre",
          align: "left"
        },
        {
          title: "Área (ha)",
          dataIndex: "value",
          key: "area",
          align: "rigth",
          width: "75px"
        }
      ];
      return (
        <div>
          <Row type="flex" justify="end">
            <Col span={6}>
              <Button
                onClick={() => this.setModalMunicipio(municipio)}
                style={{ marginBottom: 10 }}
                type="primary"
                icon="pie-chart"
              >
                Gráfico
              </Button>
            </Col>
          </Row>
          <TableWrapper
            style={{ border: "none" }}
            pagination={false}
            rowSelection={rowSelection}
            size="small"
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      );
    }
  };

  onSelectMunicipioChange = selectedMunicipioRowKeys => {
    this.setState({ selectedMunicipioRowKeys });
  };

  onSelectTotalChange = selectedTotalRowKeys => {
    this.setState({ selectedTotalRowKeys });
  };

  changeTab = key => {
    this.setState({ selectedRowKeys: [] });
    this.props.selectedRows(null, []);
  };



  setModalTotal = () => {
    let dataSource = this.state.total;
    dataSource = dataSource.map(item => {
      let color = getRandomColor();
      item.area = _.floor(item.area, 2);
      item["color"] = color;
      item["name"] = item.nombre;
      return item;
    });

    let max = 0;
    dataSource.forEach(function (obj) {
      if (obj.area > max) {
        max = obj.area;
      }
    });

    const scale = {
      nombre: { alias: "Nombre" },
      area: { alias: "Área (ha)" }
    };

    Modal.info({
      width: "50%",
      title: "Gráfico Parcelas afectadas por tipo de uso ",
      content: (
        <div>
          <Chart data={dataSource} scale={scale} forceFit height={500}>
            <Axis title name="nombre" visible={false} />

            <Tooltip crosshairs={{ type: "rect" }} />
            <Geom type="interval" position="nombre*area" color="color" />
          </Chart>
        </div>
      ),
      onOk() { }
    });
  };

  setModalMunicipio = municipio => {
    let dataSource = this.state.municipios;
    dataSource = dataSource[municipio];
    dataSource = dataSource.map(item => {
      let color = getRandomColor();
      item.area = _.floor(item.area, 2);
      item["color"] = color;
      item["name"] = item.nombre;
      return item;
    });

    let max = 0;
    dataSource.forEach(function (obj) {
      if (obj.area > max) {
        max = obj.area;
      }
    });
    const scale = {
      nombre: { alias: "Nombre" },
      area: { alias: "Área (ha)" }
    };

    Modal.info({
      width: "50%",
      title: "Gráfico Parcelas afectadas por tipo de uso ",
      content: (
        <div>
          <Chart data={dataSource} scale={scale} forceFit height={500}>
            <Axis title name="nombre" visible={false} />

            <Tooltip crosshairs={{ type: "rect" }} />
            <Geom type="interval" position="nombre*area" color="color" />
          </Chart>
        </div>
      ),
      onOk() { }
    });
  };

  render() {
    return (
      <div>
        <P>Parcelas afectadas por tipo de uso</P>

        <TabsWrapper
          size="small"
          defaultActiveKey={this.state.selectedTab.toString()}
          //defaultActiveKey="1"
          onChange={this.changeTab}
        >
          <TabPane tab="Total" key="1">
            {this.renderTotal()}
          </TabPane>
          <TabPane tab="Sagua la Grande" key="2">
            {this.renderMunicipio("SAGUA LA GRANDE")}
          </TabPane>
          <TabPane tab="Encrucijada" key="3">
            {this.renderMunicipio("Encrucijada")}
          </TabPane>
          <TabPane tab="Caibarién" key="4">
            {this.renderMunicipio("CAIBARIEN")}
          </TabPane>
          <TabPane tab="Camajuaní" key="5">
            {this.renderMunicipio("CAMAJUANÍ")}
          </TabPane>
        </TabsWrapper>
      </div>
    );
  }
}
