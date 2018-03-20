import React from "react"
import { Layout, Steps } from 'antd';
import { Localize } from "../../internationalization/components";
import { observer, Provider } from "mobx-react";
import { RegisterStore, STORE_REGISTER } from "../../components/Register/RegisterStore";
import { Register } from "../../components/Register";
import { BaseLayout } from "../../layouts/BaseLayout";

const {Footer, Content} = Layout;
const Step = Steps.Step;


const menuItemStyle = {
  width: '20%',
  textAlign: 'center'
};
const helperItemStyle = {
  width: '10%',
  textAlign: 'center'
};
const stepStyle = {
  marginTop: "5%",
  marginBottom: "5%",
  paddingLeft: "5%",
  paddingRight: "5%"
};

@observer
export class RegisterPage extends React.Component<any, any> {
  render() {
    const store = {
      [STORE_REGISTER]: new RegisterStore()
    };
    return <BaseLayout>
    <Provider {...store} >
      <div>
        <Localize replacements={{
          homeLabel: "frameMenu.home", imageLabel: "frameMenu.imageLabel",
          videoLabel: "frameMenu.videoLabel", textLabel: "frameMenu.textLabel",
          aboutLabel: "frameMenu.aboutLabel",
          step1Label: "registerForm.step1", step2Label: "registerForm.step2",
          step3Label: "registerForm.step3",
        }}>{
          (props) => {
            return <Layout>
                <Content>
                  <Steps current={store[STORE_REGISTER].currentStep} style={stepStyle}>
                    <Step title={props.step1Label}/>
                    <Step title={props.step2Label}/>
                    <Step title={props.step3Label}/>
                  </Steps>
                </Content>
                <Content>
                  <Register/>
                </Content>
            </Layout>
          }
        }
        </Localize>

      </div>
    </Provider>
    </BaseLayout>;
  }
}
