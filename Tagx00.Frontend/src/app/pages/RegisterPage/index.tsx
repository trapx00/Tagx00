import React from "react";
import { RegisterForm } from "./RegisterForm";
import { Col, Row } from 'antd';
import { observer } from "mobx-react";
import { RegisterEmailSender } from "./RegisterEmailSender";
import { RegisterStore } from "./RegisterStore";

import { RegisterSuccessShower } from "./RegisterSuccessShower";
import { SvgImg } from "../../components/Common/SvgImg";
import { Inject, Module } from "react.di";
import styled from "styled-components";

const CenterContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

const FormContainer = styled.div`
  padding: 5%;
`;

@Module({
  providers: [
    {provide: RegisterStore, useClass: RegisterStore}
  ]
})
@observer
export class RegisterPage extends React.Component<any, any> {
  @Inject registerStore: RegisterStore;

  render() {
    switch (this.registerStore.step) {
      case 0:
        return (<Row type={"flex"} align={"middle"} justify={"center"}>
          <Col sm={24} md={12}>
            <CenterContainer>
              <SvgImg filePath={"tag_x00_logo.svg"} height={250} width={250}/>
            </CenterContainer>
          </Col>
          <Col sm={24} md={12}>
            <FormContainer>
              <RegisterForm/>
            </FormContainer>
          </Col>
        </Row>);
      case 1:
        return (
          <RegisterEmailSender/>
        );
      case 2:
        return (
          <RegisterSuccessShower/>
        );
      default:
        return null;
    }
  }
}
