import React from "react";
import { Card, Icon, Avatar, Tooltip, Tag } from 'antd';
import { Instance } from "../../models/instance/Instance";
import { missionService } from "../../api/MissionService";
import { ImageMissionDetail } from "../../models/mission/ImageMission";
import { AsyncComponent } from "../../router/AsyncComponent";
import { LocaleMessage, Localize } from "../../internationalization/components";
import { InstanceDetail } from "../../models/instance/InstanceDetail";
import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { STORE_ROUTER } from "../../constants/stores";
import { inject } from "mobx-react";
import { RouterStoreProps } from "../../router/RouterStore";

const {Meta} = Card;


const maxTextCount = 23;

function processDescription(text: string) {
  return text.length < maxTextCount
    ? text : text.substr(0, maxTextCount) + "...";
}




class CardAction extends React.Component<{type: string, onClick: () => void, hoverTextId: string},{}> {
  render() {
    return <Localize replacements={{ title: this.props.hoverTextId }}>
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


interface Props extends RouterStoreProps {
  instance: Instance;
}


@inject(STORE_ROUTER)
export class MyMissionCard extends React.Component<Props, any> {

  goToDoMission = () => {
    const missionId = this.props.instance.missionId;
    const router = this.props[STORE_ROUTER];
    router.jumpTo(`/missions/${missionId}/doWork`);
  };

  abandonMission = () => {
    const missionId = this.props.instance.missionId;
  };

  goDetail = () => {
    const missionId = this.props.instance.missionId;
    this.props[STORE_ROUTER].jumpTo(`/missions/${missionId}/result`);
  };

  title(title: string) {
    const { missionInstanceState } = this.props.instance;
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
          <CardAction key={"continue"} type={"edit"} onClick={this.goToDoMission} hoverTextId={"selfCenter.myMissions.cardActions.continue"}/>,
          <CardAction key={"delete"} type={"delete"} onClick={this.abandonMission} hoverTextId={"selfCenter.myMissions.cardActions.abandon"}/>);
         break;
      case MissionInstanceState.SUBMITTED:
        break;
      case MissionInstanceState.ABANDONED:
        buttons.push(<CardAction key={"continue"} type={"edit"} onClick={this.goToDoMission} hoverTextId={"selfCenter.myMissions.cardActions.continue"}/>);
    }

    buttons.push(<CardAction key={"search"} type={"search"} onClick={this.goDetail} hoverTextId={"selfCenter.myMissions.cardActions.seeMore"}/>);

    return buttons;

  };

  renderCard = async () => {
    const {instance} = this.props;
    const mission: ImageMissionDetail = await missionService.getAMission(instance.missionId);
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
