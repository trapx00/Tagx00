import * as React from "react";
import {RegisterForm} from "../../components/RegisterForm";
import {Layout, Menu, Icon, Row, Col, Steps} from 'antd';
import {Localize} from "../../internationalization/components";
import {LanguageSelector} from "../../components/LanguageSelector";

const {Header, Footer, Content} = Layout;
const Step = Steps.Step;

const menuItemStyle = {
    width: '22.5%',
    textAlign: 'center'
}
const languageItemStyle = {
    width: '10%',
    textAlign: 'right'
}
const stepStyle = {
    marginTop: "5%",
    marginBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%"
}

export class RegisterPage extends React.Component<any, any> {
    render() {
        return <div>
            <Localize homeLabel={"frameMenu.home"} imageLabel={"frameMenu.imageLabel"}
                      videoLabel={"frameMenu.videoLabel"} textLabel={"frameMenu.textLabel"}
                      step1Label={"registerForm.step1"} step2Label={"registerForm.step2"}
                      step3Label={"registerForm.step3"}>{
                (props) => {
                    return <Layout>
                        <Header>
                            <Menu
                                theme="light"
                                mode="horizontal">
                                <Menu.Item key="home" style={menuItemStyle}>
                                    <Icon type="home"/>{props.homeLabel}
                                </Menu.Item>
                                <Menu.Item key="image" style={menuItemStyle}>
                                    <Icon type="camera"/>{props.imageLabel}
                                </Menu.Item>
                                <Menu.Item key="video" style={menuItemStyle}>
                                    <Icon type="youtube"/>{props.videoLabel}
                                </Menu.Item>
                                <Menu.Item key="text" style={menuItemStyle}>
                                    <Icon type="file-text"/>{props.textLabel}
                                </Menu.Item>
                                <Menu.Item key="language" style={languageItemStyle}>
                                    <LanguageSelector/>
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <Layout>
                            <Content>
                                <Steps current={0} style={stepStyle}>
                                    <Step title={props.step1Label}/>
                                    <Step title={props.step2Label}/>
                                    <Step title={props.step3Label}/>
                                </Steps>
                            </Content>
                            <Content>
                                <Row>
                                    <Col span={12}>
                                        <img id="logo" src={require('../../../assets/logo.png')}
                                             alt="" style={{padding: '5%', paddingLeft: '20%'}}/>
                                    </Col>
                                    <Col span={12}>
                                        <div style={{padding: '5%', paddingRight: '10%'}}>
                                            <RegisterForm/></div>
                                    </Col>
                                </Row>
                            </Content>
                        </Layout>
                        <Footer style={{textAlign: 'center'}}>
                            @Powered by Trapx00
                        </Footer>
                    </Layout>
                }
            }</Localize>
        </div>;
    }
}