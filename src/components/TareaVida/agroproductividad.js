import React, { Component } from "react";
import { Table, Tabs, message } from "antd";
import {
  fetchAgroproductividad,
  fetchAgroproductividadByMun
} from "./../../services";
import styled from "styled-components";
import { Chart, Axis, Tooltip, Geom } from "bizcharts";

const TabPane = Tabs.TabPane;

const P = styled.p`
  const: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  display: block;
  font-family: "Monospaced Number", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
`;

const Div = styled.div``;
const TabsWrapper = styled(Tabs)`
  &.ant-tabs-tab {
    margin: 0 !important;
  }
`;

export default class Agroproductividad extends Component {
  state = {
    total: null,
    municipios: {},
    selectedTotalRowKeys: [],
    selectedMunicipioRowKeys: [],
    selectedTab: 1
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
    const { total } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
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
          <Table
            pagination={false}
            rowSelection={rowSelection}
            size="small"
            dataSource={dataSource}
            columns={columns}
          />
          <Div>
            <Chart height={290} data={dataSource} scale={scale} forceFit>
              <Axis title name="categorías" />
              <Axis title name="valores" />
              <Tooltip crosshairs={{ type: "rect" }} />
              <Geom type="interval" position="key*value" color="value" />
            </Chart>
          </Div>
        </div>
      );
    }
  };

  renderMunicipio = municipio => {
    const { municipios, selectedMunicipioRowKeys } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.props.selectedRows(municipio, selectedRows);
      }
    };

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

      const scale = {
        key: { alias: "Categorías" },
        value: { alias: "Valores" }
      };
      return (
        <div>
          <Table
            pagination={false}
            rowSelection={rowSelection}
            size="small"
            dataSource={dataSource}
            columns={columns}
          />
          <Div>
            <Chart height={290} data={dataSource} scale={scale} forceFit>
              <Axis title name="categorías" />
              <Axis title name="valores" />
              <Tooltip crosshairs={{ type: "rect" }} />
              <Geom type="interval" position="key*value" color="value" />
            </Chart>
          </Div>
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
    console.log(key);
  };

  changeLayer = (type, rows) => {
    if (type === "total") {
      rows.map(item => {
        console.log(this.state.total[item]);
      });
    }
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
