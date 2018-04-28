import React from "react"
import { Icon, Button } from "antd";
import { Link } from 'react-router-dom';
import { Localize } from "../../internationalization/components";
import { Inject } from "react.di";
import { RouterStore } from "../../stores/RouterStore";
import { LocaleStore } from "../../stores/LocaleStore";
import { RegisterStore } from "./RegisterStore";

export class RegisterSuccessShower extends React.Component<any, any> {


  @Inject routerStore: RouterStore;
  @Inject registerStore: RegisterStore;

  onBackToHomeClicked = () => {
    this.routerStore.jumpTo("/browse");
    this.registerStore.clear();
  };

  render() {
    return (
      <Localize replacements={{}}>{
        (props) => {
          return (
            <div style={{textAlign: 'center'}}>
              <Icon type="check-circle-o" style={{fontSize: 200, color: "green"}}/>
              <div style={{padding: "30%", paddingTop: "10%"}}>
                <h3>注册成功</h3>
                <div style={{margin: "5%"}}>
                  <Button type="primary" size="large" onClick={this.onBackToHomeClicked}>返回首页</Button>
                </div>
              </div>
            </div>);
        }
      }
      </Localize>)
  }
}
