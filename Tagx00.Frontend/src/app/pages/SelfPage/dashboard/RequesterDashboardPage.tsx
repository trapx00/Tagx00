import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { RequesterService } from "../../../api/RequesterService";
import { LocaleMessage } from "../../../internationalization/components";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem";
import { Row, Col } from "antd";
import { PayService } from "../../../api/PayService";
import { InstanceCyclePieChart } from "./charts/InstanceCyclePieChart";

export class RequesterDashboardPage extends React.Component<{},{}> {
    @Inject userStore:UserStore;
    @Inject requesterService:RequesterService;
    @Inject payService: PayService;

  requesterInfo = async () => {
    const info = await this.requesterService.getRequesterInfo(this.userStore.user.username);
    console.log(info);
    const total = info.finalizedInstanceCount+info.inProgressInstanceCount+info.awaitingCommentInstanceCount;
    return <div>
      <DefinitionItem prompt={"已发布任务数"} children={info.submittedMissionCount}/>
      <DefinitionItem prompt={"实例数"} children={info.instanceCount}/>
      <DefinitionItem prompt={"进行中实例数"} children={info.inProgressInstanceCount}/>
      <DefinitionItem prompt={"待评价实例数"} children={info.awaitingCommentInstanceCount}/>
      <DefinitionItem prompt={"已完成实例数"} children={info.finalizedInstanceCount}/>
      <InstanceCyclePieChart activeInstanceCount={info.inProgressInstanceCount} pendingInstanceCount={info.awaitingCommentInstanceCount} endedInstanceCount={info.finalizedInstanceCount} totalInstanceCount={total}/>
    </div>
  }

  registerInfo = async () => {
    const info = await this.requesterService.getRequesterInfo(this.userStore.user.username);
    const credit = await this.payService.getCredits();
    return <div>
      <DefinitionItem prompt={"用户名"}>
        {info.username}
      </DefinitionItem>
      <DefinitionItem prompt={"注册邮箱"}>
        {info.email}
      </DefinitionItem>
      <DefinitionItem prompt={"积分"}>
        {credit.credits}
      </DefinitionItem>
    </div>
  };
    render() {
        return (
            <div style={{maxWidth: "1000px", marginLeft: "auto", marginRight: "auto"}}>
              <Row>
                <Col xs={24} sm={8} md={6} lg={4} >
                  <img alt="avatar" height={150} width={150} src={this.userStore.user.avatarUrl}/>
                </Col>
                <Col sm={16} md={18} lg={20}>
                  <br/>
                  <AsyncComponent render={this.registerInfo}/>
                </Col>
              </Row>

              <br/>
              <br/>
              <h2>
                <LocaleMessage id={"selfCenter.dashboard"}/>
              </h2>
              <br/>
              <AsyncComponent render={this.requesterInfo}/>

            </div>
        )
    }
    
}
