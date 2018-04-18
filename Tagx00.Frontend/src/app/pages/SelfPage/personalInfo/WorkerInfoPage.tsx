import React from "react";
import {UserStore} from "../../../stores/UserStore";
import {WorkerService} from "../../../api/WorkerService";
import {Inject} from "react.di";
import {LocaleMessage} from "../../../internationalization/components";
import {AsyncComponent} from "../../../router/AsyncComponent";
import {LevelStore} from "../../../stores/LevelStore";
import Progress from "antd/es/progress/progress";

export class WorkerInfoPage extends React.Component<{},{}> {
    @Inject userStore: UserStore;
    @Inject workerService: WorkerService;
    @Inject levelStore: LevelStore;

    workerInfo = async () => {
        const info = await this.workerService.getWorkerInfo(this.userStore.user.username,this.userStore.token);
        const nextLevelExp = this.levelStore.getNextLevelExp(info.exp); //下一等级总经验，不是还差
        const percent = (info.exp)/200;
        return <div>
            <p>用户名：{info.username}</p>
            <p>注册邮箱：{info.email}</p>
            <p>等级：{info.level} </p>
          <div>
            <Progress percent={percent}/> {info.exp}/{nextLevelExp}
          </div>
            <p>积分：{info.credits }</p>
        </div>
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