import React from 'react';
import { MissionDetail, MissionPublicItem, MissionState } from "../../models/mission/Mission";
import { Card, Tag } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import { CardAction, stubCard, truncateText } from "./util";
import { Link } from 'react-router-dom';
import { MissionPublicResponse } from "../../models/response/mission/MissionPublicResponse";
import { MissionService } from "../../api/MissionService";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { AsyncComponent } from "../../router/AsyncComponent";

const {Meta} = Card;

interface Props {
  mission: MissionPublicItem;
}

const ID_PREFIX = "missions.requester.missionCard.";

const statusTagMap = {
  [MissionState.ACTIVE]: <Tag color={"#87d068"}><LocaleMessage id={ID_PREFIX + "state.ACTIVE"}/></Tag>,
  [MissionState.PENDING]: <Tag color={"#2db7f5"}><LocaleMessage id={ID_PREFIX + "state.PENDING"}/></Tag>,
  [MissionState.ENDED]: <Tag color={"#f50"}><LocaleMessage id={ID_PREFIX + "state.ENDED"}/></Tag>
};

function Title(props: { mission: MissionDetail }) {
  return <div>
    <span style={{marginRight: "4px"}}>{props.mission.publicItem.title}</span>
    {statusTagMap[props.mission.missionState]}
  </div>
}

function getActions(mission: MissionDetail, showInfoModal: () => void) {

  return [
    <Link to={`/mission/instance?missionId=${mission.publicItem.missionId}`}>
      <CardAction key={"search"}
                  iconType={"search"}
                  hoverTextId={ID_PREFIX + "actions.searchInstances"}/>
    </Link>,
    <CardAction key={"info"}
                iconType={"info"}
                onClick={showInfoModal}
                hoverTextId={ID_PREFIX + "actions.searchInstances"}/>,

  ]
}

export class RequesterMissionCard extends React.Component<Props, {}> {

  @Inject missionService: MissionService;
  @Inject userStore: UserStore;

  showModal = () => {

  };

  renderCard = async () => {
    const detail = await this.missionService.getAMission(this.props.mission.missionId, this.userStore.token);

    return <Card
      style={{width: 300}}
      cover={<img alt="example" src={this.props.mission.coverUrl}/>}
      actions={getActions(detail, this.showModal)}>
      <Meta
        title={<Title mission={detail}/>}
        description={truncateText(this.props.mission.description)}
      />
    </Card>
  };

  render() {
    return <AsyncComponent render={this.renderCard} componentWhenLoading={stubCard}/>

  }
}
