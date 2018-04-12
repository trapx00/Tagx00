import React from "react";
import { Form } from 'antd';
import {Inject} from "react.di";
import {observer} from "mobx-react";
import {action} from "mobx";
import {UserService} from "../../api/UserService";
import {LocaleMessage} from "../../internationalization/components";

@observer
export class DashboardPage extends React.Component<any, any> {

    @Inject userService: UserService;

    mail : string;
    currentEx : string;
    nextEx : string ;

    fetch = async () => {
        const mail = await this.userService.login("","");
    }

    render() {

      return[
          <h1>
              <LocaleMessage id={selfCenter.}/>
          </h1>
          <p>用户名:</p>,
          <p>邮箱:</p>,
          <p>经验:</p>,
          <p>积分:</p>
                  ]

  }
}
