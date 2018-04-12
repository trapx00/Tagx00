import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { Tag } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import React from "react";

const ID_PREFIX = "selfCenter.myMissions.";

const stateTagMap = {
  [MissionInstanceState.SUBMITTED]: <Tag color="#87d068"><LocaleMessage id={ID_PREFIX + "cardState.submitted"}/></Tag>,
  [MissionInstanceState.IN_PROGRESS]: <Tag color="#2db7f5"><LocaleMessage id={ID_PREFIX + "cardState.inProgress"}/></Tag>,
  [MissionInstanceState.ABANDONED]: <Tag color="#f50"><LocaleMessage id={"selfCenter.myMissions.cardState.abandoned"}/></Tag>
};

export function InstanceStateTag(props: {state: MissionInstanceState}) {
  return stateTagMap[props.state];
}
