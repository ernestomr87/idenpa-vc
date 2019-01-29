import React, { Component } from "react";
import { Table, Tabs, message, Modal, Row, Col, Button } from "antd";
import {
  fetchAgroproductividad,
  fetchAgroproductividadByMun
} from "./../../services";
import styled from "styled-components";
import { Chart, Axis, Tooltip, Geom } from "bizcharts";
import _ from "lodash";
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

const TableWrapper = styled(Table)`
  .ant-table {
    border: none;
  }
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
    if (number == Object.keys(letters)[j]) {
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

export default class Agroproductividad extends Component {
  state = {
    total: null,
    municipios: {},
    selectedTotalRowKeys: [],
    selectedMunicipioRowKeys: [],
    selectedTab: 1,
    selectedRowKeys: []
  };

  componentWillMount = () => {
    this.fetchTotalData();
    this.fetchMunData("Sagua la Grande");
    this.fetchMunData("Encrucijada");
    this.fetchMunData("Caibarién");
    this.fetchMunData("Camajuaní");
  };

  fetchTotalData = () => {
    const _this = this;
    fetchAgroproductividad()
      .then(function(response) {
        _this.setState({
          total: response.data
        });
      })
      .catch(function(error) {
        // handle error
        message.error(error.message);
      });
  };

  fetchMunData = mun => {
    const _this = this;
    let municipios = this.state.municipios;
    fetchAgroproductividadByMun(mun)
      .then(function(response) {
        municipios[mun] = response.data;
        _this.setState({
          municipios: municipios
        });
      })
      .catch(function(error) {
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
      Object.keys(total).forEach(function(key) {
        let cat = total[key].cat;
        let area = total[key].area;
        dataSource.push({ key: cat, value: area });
      });

      const columns = [
        {
          title: "Categoría",
          dataIndex: "key",
          key: "key",
          align: "center"
        },
        {
          title: "Área (ha)",
          dataIndex: "value",
          key: "value",
          align: "center"
        }
      ];

      const scale = {
        key: { alias: "Categorías" },
        value: { alias: "Valores" }
      };
      return (
        <div>
          <Row type="flex" justify="end">
            <Col span={6}>
              <Button
                onClick={() => this.setModalTotal()}
                style={{ marginBottom: 10 }}
                type="primary"
                icon="pie-chart"
              >
                Gráfico
              </Button>
            </Col>
          </Row>
          <TableWrapper
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

    console.log(municipio);
    console.log(municipios);
    console.log(municipios[municipio]);

    const dataSource = [];
    if (municipios[municipio]) {
      Object.keys(municipios[municipio]).forEach(function(key) {
        let cat = municipios[municipio][key].cat;
        let area = municipios[municipio][key].area;
        dataSource.push({ key: cat, value: area });
      });

      const columns = [
        {
          title: "Categoría",
          dataIndex: "key",
          key: "key",
          align: "center"
        },
        {
          title: "Área (ha)",
          dataIndex: "value",
          key: "value",
          align: "center"
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
    console.log("selectedRowKeys changed: ", selectedMunicipioRowKeys);
    this.setState({ selectedMunicipioRowKeys });
  };

  onSelectTotalChange = selectedTotalRowKeys => {
    this.changeLayer("total", selectedTotalRowKeys);
    this.setState({ selectedTotalRowKeys });
  };

  changeTab = key => {
    this.setState({ selectedRowKeys: [] });
    this.props.selectedRows(null, []);
  };

  changeLayer = (type, rows) => {
    if (type === "total") {
      rows.map(item => {
        console.log(this.state.total[item]);
      });
    }
  };

  setModalTotal = () => {
    // key*value
    let dataSource = this.state.total;
    dataSource = dataSource.map(item => {
      let color = getRandomColor();
      item.area = _.floor(item.area, 2);
      item["color"] = color;
      return item;
    });

    const scale = {
      cat: { alias: "Nombre" },
      area: { alias: "Área (ha)" }
    };

    Modal.info({
      width: "50%",
      title: "Agroproductividad en los suelos ",
      content: (
        <div>
          <Chart data={dataSource} scale={scale} forceFit>
            <Axis title name="key" visible={false} />

            <Tooltip crosshairs={{ type: "rect" }} />
            <Geom type="interval" position="cat*area" color="color" />
          </Chart>
        </div>
      ),
      onOk() {}
    });
  };

  setModalMunicipio = municipio => {
    let dataSource = this.state.municipios;
    console.log(dataSource + " " + "dataSource = this.state.municipios;");
    dataSource = dataSource[municipio];
    console.log(dataSource + " " + "dataSource = dataSource[municipio];");
    dataSource = dataSource.map(item => {
      let color = getRandomColor();
      item.area = _.floor(item.area, 2);
      item["color"] = color;
      return item;
    });

    const scale = {
      cat: { alias: "Nombre" },
      area: { alias: "Área (ha)" }
    };

    Modal.info({
      width: "50%",
      title: "Agroproductividad en los suelos ( " + municipio +" )",
      content: (
        <div>
          <Chart data={dataSource} scale={scale} forceFit>
            <Axis title name="nombre" visible={false} />

            <Tooltip crosshairs={{ type: "rect" }} />
            <Geom type="interval" position="cat*area" color="color" />
          </Chart>
        </div>
      ),
      onOk() {}
    });
  };

  render() {
    return (
      <div>
        <P>Agroproductividad en los suelos</P>

        <TabsWrapper
          size="small"
          defaultActiveKey={this.state.selectedTab}
          onChange={this.changeTab}
        >
          <TabPane tab="Total" key={1}>
            {this.renderTotal()}
          </TabPane>
          <TabPane tab="Sagua la Grande" key={2}>
            {this.renderMunicipio("Sagua la Grande")}
          </TabPane>
          <TabPane tab="Encrucijada" key={3}>
            {this.renderMunicipio("Encrucijada")}
          </TabPane>
          <TabPane tab="Caibarién" key={4}>
            {this.renderMunicipio("Caibarién")}
          </TabPane>
          <TabPane tab="Camajuaní" key={5}>
            {this.renderMunicipio("Camajuaní")}
          </TabPane>
        </TabsWrapper>
      </div>
    );
  }
}
