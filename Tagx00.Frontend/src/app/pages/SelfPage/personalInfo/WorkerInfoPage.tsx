import React from "react";
import {UserStore} from "../../../stores/UserStore";
import {WorkerService} from "../../../api/WorkerService";
import {Inject} from "react.di";
import {LocaleMessage} from "../../../internationalization/components";
import {AsyncComponent} from "../../../router/AsyncComponent";
import {LevelStore} from "../../../stores/LevelStore";
import { Progress } from 'antd';
import { DefinitionItem } from "../../../components/DefinitionItem";
import { observer } from "mobx-react";

@observer
export class WorkerInfoPage extends React.Component<{},{}> {
    @Inject userStore: UserStore;
    @Inject workerService: WorkerService;
    @Inject levelStore: LevelStore;

    workerInfo = async () => {
      const info = await this.workerService.getWorkerInfo(this.userStore.user.username,this.userStore.token);
      const nextLevelExp = await this.levelStore.getNextLevelExp(info.exp);
        const percent = (info.exp)*100/nextLevelExp;
        return (
          <div>
            <DefinitionItem prompt={"用户名"}>
              {info.username}
            </DefinitionItem>
            <DefinitionItem prompt={"注册邮箱"}>
              {info.email}
            </DefinitionItem>
            <DefinitionItem prompt={"等级"}>
              {info.level}
            </DefinitionItem>
            <DefinitionItem prompt={"经验"}
                            children ={
                                <div style={{width:200}}>
                                   <Progress percent={percent} format={ () => info.exp + "/"+ nextLevelExp} />
                                </div>}/>
            <DefinitionItem prompt={"积分"}>
              {info.level}
            </DefinitionItem>
        </div>);
    }

    render() {
        return (
            <div>
                <h1>
                    <LocaleMessage id={"selfCenter.personalInfo"}/>
                </h1>
                <AsyncComponent render={this.workerInfo}/>
            </div>
        )
    }
}