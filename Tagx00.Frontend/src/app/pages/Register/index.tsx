import * as React from "react";
import {Layout, Menu, Icon, Row, Col, Steps} from 'antd';
import {Localize} from "../../internationalization/components";
import {LanguageSelector} from "../../components/LanguageSelector";
import {observer} from "mobx-react";
import {registerStore} from "../../components/Register/RegisterStore";
import {Register} from "../../components/Register";

const {Footer, Content} = Layout;
const Step = Steps.Step;

const menuItemStyle = {
    width: '20%',
    textAlign: 'center'
}
const helperItemStyle = {
    width: '10%',
    textAlign: 'center'
}
const stepStyle = {
    marginTop: "5%",
    marginBottom: "5%",
    paddingLeft: "5%",
    paddingRight: "5%"
}

@observer
export class RegisterPage extends React.Component<any, any> {
    render() {
        return <div>
            <Localize homeLabel={"frameMenu.home"} imageLabel={"frameMenu.imageLabel"}
                      videoLabel={"frameMenu.videoLabel"} textLabel={"frameMenu.textLabel"}
                      aboutLabel={"frameMenu.aboutLabel"}
                      step1Label={"registerForm.step1"} step2Label={"registerForm.step2"}
                      step3Label={"registerForm.step3"}>{
                (props) => {
                    return <Layout>
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
                            <Menu.Item key="about" style={helperItemStyle}>
                                <Icon type="customer-service"/>{props.aboutLabel}
                            </Menu.Item>
                            <Menu.Item key="language" style={helperItemStyle}>
                                <LanguageSelector/>
                            </Menu.Item>
                        </Menu>
                        <Layout>
                            <Content>
                                <Steps current={registerStore.currentStep} style={stepStyle}>
                                    <Step title={props.step1Label}/>
                                    <Step title={props.step2Label}/>
                                    <Step title={props.step3Label}/>
                                </Steps>
                            </Content>
                            <Content>
                                <Register/>
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