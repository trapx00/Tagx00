import React from "react";
import {UserStore} from "../../../stores/UserStore";
import {RequesterService} from "../../../api/RequesterService";
import {Inject} from "react.di";
import {LocaleMessage} from "../../../internationalization/components";
import {AsyncComponent} from "../../../router/AsyncComponent";

export class RequesterInfoPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject requesterService:RequesterService;

    requesterInfo = async () => {
        const info = await this.requesterService.getRequesterInfo(this.userStore.user.username,this.userStore.token);
        return <div>
            <p>用户名：{info.username}</p>
            <p>注册邮箱：{info.email}</p>
            <p>积分：//缺接口</p>
        </div>
    }

    render() {
        return (
            <div>
                <h1>
                    <LocaleMessage id={"selfCenter.personalInfo"}/>
                </h1>
                <AsyncComponent render={this.requesterInfo}/>
            </div>
        )
    }
}