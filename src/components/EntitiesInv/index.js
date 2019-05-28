import React from "react";
import { Timeline, message, Icon, Col, Row, List, Alert } from "antd";
import styled from "styled-components";
import { fetchInfrastructure } from "./../../services";

const AlertWrapper = styled(Alert)`
  &.ant-alert {
    margin-top: 20px;
  }
`;

export class EntitiesInv extends React.Component {
  state = {
    items: []
  };

  componentWillReceiveProps = nextProps => {
    const { properties } = this.props;
    if (nextProps.properties.gid !== properties.gid) {
      this.fetchData(nextProps.properties.gid);
    }
  };

  componentWillMount = () => {
    const { properties } = this.props;
    this.fetchData(properties.gid);
  };

  fetchData = gid => {
    const _this = this;
    fetchInfrastructure(gid)
      .then(function (response) {
        let items = [];
        response.data.map(item => {
          if (items[item.year]) {
            items[item.year].push(item);
          } else {
            items[item.year] = [];
            items[item.year].push(item);
          }
          return null;
        });
        _this.setState({
          items: items
        });
      })
      .catch(function (error) {
        // handle error
        message.error(error.message);
      });
  };

  render() {
    const { items } = this.state;

    return (
      <div>
        {items.length ? (
          <div>
            <h4 style={{ margin: "20px 0 20px 0" }}>
              Inversiones planificadas por año
            </h4>
            <Timeline>
              {items.map((item, key) => {
                return (
                  <Timeline.Item
                    dot={<Icon type="calendar" style={{ fontSize: "16px" }} />}
                  >
                    <p
                      style={{
                        color: "#314659",
                        fontSize: "14px",
                        fontWeight: 500
                      }}
                    >
                      {key}
                    </p>
                    <List
                      itemLayout="horizontal"
                      dataSource={item}
                      renderItem={inv => (
                        <List.Item>
                          <Col xs={24}>
                            <Row>
                              <Col
                                xs={8}
                                style={{ color: "rgb(19, 116, 205)" }}
                              >
                                Nombre
                              </Col>
                              <Col xs={16}>{inv.nombre_inversion}</Col>
                            </Row>
                            <Row>
                              <Col
                                xs={8}
                                style={{ color: "rgb(19, 116, 205)" }}
                              >
                                OSDE
                              </Col>
                              <Col xs={16}>{inv.osde}</Col>
                            </Row>
                            <Row>
                              <Col
                                xs={8}
                                style={{ color: "rgb(19, 116, 205)" }}
                              >
                                Programa
                              </Col>
                              <Col xs={16}>{inv.programa}</Col>
                            </Row>
                          </Col>
                        </List.Item>
                      )}
                    />
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </div>
        ) : (
            <AlertWrapper
              message="No hay inversiones disponibles"
              type="warning"
            />
          )}
      </div>
    );
  }
}

export default EntitiesInv;
