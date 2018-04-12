import React from "react";
import { Card, Icon, Tag, Tooltip } from 'antd';
import { Instance } from "../../models/instance/Instance";
import { ImageMissionDetail } from "../../models/mission/image/ImageMission";
import { AsyncComponent } from "../../router/AsyncComponent";
import { LocaleMessage, Localize } from "../../internationalization/components";
import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { RouterStore } from "../../stores/RouterStore";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { MissionService } from "../../api/MissionService";

const {Meta} = Card;


const maxTextCount = 23;

function processDescription(text: string) {
  return text.length < maxTextCount
    ? text : text.substr(0, maxTextCount) + "...";
}


class CardAction extends React.Component<{ type: string, onClick: () => void, hoverTextId: string }, {}> {
  render() {
    return <Localize replacements={{title: this.props.hoverTextId}}>
      {props =>
        <Tooltip arrowPointAtCenter placement="topLeft" title={props.title}>
          <Icon type={this.props.type} onClick={this.props.onClick}/>
        </Tooltip>
      }
    </Localize>
  }

}


const stubCard = <Localize replacements={{
  title: "selfCenter.myMissions.loadingCard"
}}>
  {props =>
    <Card loading title={props.title} style={{width: 300}}>
      Whatever content
    </Card>
  }
</Localize>;


interface Props {
  instance: Instance;
}


export class WorkerInstanceCard extends React.Component<Props, any> {

  @Inject userStore: UserStore;
  @Inject routerStore: RouterStore;

  @Inject missionService: MissionService;

  goToDoMission = () => {
    const missionId = this.props.instance.missionId;
    this.routerStore.jumpTo(`/mission/${missionId}/doWork`);
  };

  abandonMission = () => {
    const missionId = this.props.instance.missionId;
  };

  goDetail = () => {
    const missionId = this.props.instance.missionId;
    this.routerStore.jumpTo(`/mission/${missionId}/result`);
  };

  title(title: string) {
    const {missionInstanceState} = this.props.instance;
    let tag;
    switch (missionInstanceState) {
      case MissionInstanceState.SUBMITTED:
        tag = <Tag color="#87d068"><LocaleMessage id={"selfCenter.myMissions.cardState.submitted"}/></Tag>;
        break;
      case MissionInstanceState.ABANDONED:
        tag = <Tag color="#f50"><LocaleMessage id={"selfCenter.myMissions.cardState.abandoned"}/></Tag>;
        break;
      case MissionInstanceState.IN_PROGRESS:
        tag = <Tag color="#2db7f5"><LocaleMessage id={"selfCenter.myMissions.cardState.inProgress"}/></Tag>;
        break;
    }

    return <div>
      <span style={{marginRight: "4px"}}>{title}</span> {tag}
    </div>
  }


  getActions = (instance: Instance) => {
    const buttons = [];

    switch (instance.missionInstanceState) {
      case MissionInstanceState.IN_PROGRESS:
        buttons.push(
          <CardAction key={"continue"} type={"edit"} onClick={this.goToDoMission}
                      hoverTextId={"selfCenter.myMissions.cardActions.continue"}/>,
          <CardAction key={"delete"} type={"delete"} onClick={this.abandonMission}
                      hoverTextId={"selfCenter.myMissions.cardActions.abandon"}/>);
        break;
      case MissionInstanceState.SUBMITTED:
        break;
      case MissionInstanceState.ABANDONED:
        buttons.push(<CardAction key={"continue"} type={"edit"} onClick={this.goToDoMission}
                                 hoverTextId={"selfCenter.myMissions.cardActions.continue"}/>);
    }

    buttons.push(<CardAction key={"search"} type={"search"} onClick={this.goDetail}
                             hoverTextId={"selfCenter.myMissions.cardActions.seeMore"}/>);

    return buttons;

  };

  renderCard = async () => {
    const {instance} = this.props;
    const mission: ImageMissionDetail = await this.missionService.getAMission(instance.missionId, this.userStore.token);
    const {publicItem} = mission;
    return <Card
      style={{width: 300}}
      cover={<img alt="example" src={publicItem.coverUrl}/>}
      actions={this.getActions(instance)}>
      <Meta
        title={this.title(publicItem.title)}
        description={processDescription(publicItem.description)}
      />
    </Card>
  };

  render() {
    return <AsyncComponent render={this.renderCard} componentWhenLoading={stubCard}/>;
  }
}
