import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { Tag, Progress, Spin, Popover } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import React from "react";
import { Instance } from "../../models/instance/Instance";
import { Inject } from "react.di";
import { MissionService } from "../../api/MissionService";
import { UserStore } from "../../stores/UserStore";
import { AsyncComponent } from "../../router/AsyncComponent";

const ID_PREFIX = "missions.worker.myMissions.";

const stateTagMap = {
  [MissionInstanceState.SUBMITTED]: <Tag color="#87d068"><LocaleMessage id={ID_PREFIX + "cardState.submitted"}/></Tag>,
  [MissionInstanceState.IN_PROGRESS]: <Tag color="#2db7f5"><LocaleMessage id={ID_PREFIX + "cardState.inProgress"}/></Tag>,
  [MissionInstanceState.ABANDONED]: <Tag color="#f50"><LocaleMessage id={ID_PREFIX +"cardState.abandoned"}/></Tag>,
  [MissionInstanceState.FINALIZED]: <Tag color="#108ee9"><LocaleMessage id={ID_PREFIX + "cardState.finalized"}/></Tag>
};

function judgeStatus(state: MissionInstanceState) {
  switch (state) {
    case MissionInstanceState.IN_PROGRESS:
      return "active";
    case MissionInstanceState.ABANDONED:
      return "exception";
    case MissionInstanceState.FINALIZED:
    case MissionInstanceState.SUBMITTED:
      return "success"
  }
}

export class InstanceStateIndicator extends React.Component<{instance: Instance}> {

  @Inject missionService: MissionService;
  @Inject userStore: UserStore;

  renderProgress = async () => {
    const missionPublicItem = await this.missionService.getAMission(this.props.instance.missionId, this.userStore.token);
    console.log(missionPublicItem);
    return <Progress percent={this.props.instance.completedJobsCount / missionPublicItem.publicItem.jobCount * 100}
                     type="circle"
                     width={80}
                     format={percent => `${this.props.instance.completedJobsCount} / ${missionPublicItem.publicItem.jobCount}`}
                     status={judgeStatus(this.props.instance.missionInstanceState)}
    />
  };

  render() {
    const {instance} = this.props;
    return <Popover content={
      <AsyncComponent render={this.renderProgress} componentWhenLoading={<Spin size={"small"}/>}/>
    }>
      {stateTagMap[instance.missionInstanceState]}
    </Popover>;
  }

}


