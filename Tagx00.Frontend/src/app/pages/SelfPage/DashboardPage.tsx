import React from "react";
import {Inject} from "react.di";
import {observer} from "mobx-react";
import {LocaleMessage} from "../../internationalization/components";
import {action, runInAction} from "mobx";
import {UserStore} from "../../stores/UserStore";
import {RequesterService} from "../../api/RequesterService";
import {WorkerService} from "../../api/WorkerService";

@observer
export class DashboardPage extends React.Component<any, any> {

    @Inject userStores: UserStore;
    @Inject workerService: WorkerService;
    @Inject requesterService: RequesterService;

    username = this.userStores.user.username;
    email = this.userStores.user.email;
    role = this.userStores.user.role;
    currentEx = 0;
    nextEx = 0 ;

    async() {
        const response = await this.workerService.
    }


    render() {
        switch(this.role){
            case ""
        }
      return (
         <div>
             <h1>
              <LocaleMessage id={"selfCenter.dashboard"}/>
             </h1>
             <p>用户名: {this.username} </p>
             <p>邮箱: {this.email} </p>
             <p>经验:</p>
             <p>积分:</p>
         </div>
              )
  }
}
