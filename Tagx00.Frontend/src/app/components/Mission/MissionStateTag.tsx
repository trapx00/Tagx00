import { MissionState } from "../../models/mission/Mission";
import { Tag } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import React from 'react';

const ID_PREFIX = "missions.requester.missionCard.";

const statusTagMap = {
  [MissionState.ACTIVE]: <Tag color={"#87d068"}><LocaleMessage id={ID_PREFIX + "missionState.ACTIVE"}/></Tag>,
  [MissionState.PENDING]: <Tag color={"#2db7f5"}><LocaleMessage id={ID_PREFIX + "missionState.PENDING"}/></Tag>,
  [MissionState.ENDED]: <Tag color={"#f50"}><LocaleMessage id={ID_PREFIX + "missionState.ENDED"}/></Tag>
};

export function MissionStateTag(props: {state: MissionState}) {
  return statusTagMap[props.state];
}
