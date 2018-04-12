import React from 'react';
import { MissionDetail, MissionPublicItem, MissionState } from "../../models/mission/Mission";
import { Card, Tag, Modal } from 'antd';
import { LocaleMessage, Localize } from "../../internationalization/components";
import { CardAction, stubCard, truncateText } from "./util";
import { Link } from 'react-router-dom';
import { MissionService } from "../../api/MissionService";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { AsyncComponent } from "../../router/AsyncComponent";
import { MissionStateTag } from "./MissionStateTag";

const {Meta} = Card;

interface Props {
  mission: MissionPublicItem;
  showDetail: (detail: MissionDetail) => void;
}

const ID_PREFIX = "missions.requester.missionCard.";

function Title(props: { mission: MissionDetail }) {
  return <div>
    <span style={{marginRight: "4px"}}>{props.mission.publicItem.title}</span>
    <MissionStateTag state={props.mission.missionState}/>
  </div>
}

function getActions(mission: MissionDetail, showInfoModal: () => void) {

  return [
    <Link to={`/mission/requester/instance?missionId=${mission.publicItem.missionId}`}>
      <CardAction key={"search"}
                  iconType={"search"}
                  hoverTextId={ID_PREFIX + "actions.searchInstances"}/>
    </Link>,
    <CardAction key={"info"}
                iconType={"info"}
                onClick={showInfoModal}
                hoverTextId={ID_PREFIX + "actions.info"}/>,

  ]
}

export class RequesterMissionCard extends React.Component<Props, {}> {

  @Inject missionService: MissionService;
  @Inject userStore: UserStore;

  detail: MissionDetail;

  showMissionDetailInfoModal = () => {
    this.props.showDetail(this.detail);
  };

  renderCard = async () => {
    this.detail = await this.missionService.getAMission(this.props.mission.missionId, this.userStore.token);

    return <>
      <Card
        style={{width: 300}}
        cover={<img alt="example" src={this.props.mission.coverUrl}/>}
        actions={getActions(this.detail, this.showMissionDetailInfoModal)}>
        <Meta
          title={<Title mission={this.detail}/>}
          description={truncateText(this.props.mission.description)}
        />
      </Card>
    </>;
  };

  render() {
    return <AsyncComponent render={this.renderCard} componentWhenLoading={stubCard}/>

  }
}
