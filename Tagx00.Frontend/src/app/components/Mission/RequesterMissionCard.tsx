import React from 'react';
import { Card } from 'antd';
import { CardAction, stubCard, truncateText } from "./util";
import { Link } from 'react-router-dom';
import { MissionService } from "../../api/MissionService";
import { Inject } from "react.di";
import { AsyncComponent } from "../../router/AsyncComponent";
import { MissionStateTag } from "./MissionStateTag";
import { MissionDetail } from "../../models/mission/MissionDetail";
import { MissionPublicItem } from "../../models/mission/MissionPublicItem";
import { MissionCardCoverImg } from "./MissionCardCoverImg";

const {Meta} = Card;

interface Props {
  mission: MissionPublicItem;
}

const ID_PREFIX = "missions.requester.missionCard.";

function Title(props: { mission: MissionDetail }) {
  return <div>
    <span style={{marginRight: "4px"}}>{props.mission.publicItem.title}</span>
    <MissionStateTag state={props.mission.missionState}/>
  </div>
}

function getActions(mission: MissionDetail) {

  return [
    <Link to={`/mission/requester/instance?missionId=${mission.publicItem.missionId}`}>
      <CardAction key={"search"}
                  iconType={"search"}
                  hoverTextId={ID_PREFIX + "actions.searchInstances"}/>
    </Link>,
    <Link to={`/mission?missionId=${mission.publicItem.missionId}`}>
    <CardAction key={"info"}
                iconType={"info"}
                hoverTextId={ID_PREFIX + "actions.info"}/>
    </Link>

  ]
}

export class RequesterMissionCard extends React.Component<Props, {}> {

  @Inject missionService: MissionService;

  detail: MissionDetail;

  renderCard = async () => {
    this.detail = await this.missionService.getAMission(this.props.mission.missionId);

    return <Card
        style={{width: 250}}
        cover={<MissionCardCoverImg url={this.props.mission.coverUrl}/>}
        actions={getActions(this.detail)}>
        <Meta
          title={<Title mission={this.detail}/>}
          description={truncateText(this.props.mission.description)}
        />
      </Card>;
  };

  render() {
    return <AsyncComponent render={this.renderCard} componentWhenLoading={stubCard}/>

  }
}
