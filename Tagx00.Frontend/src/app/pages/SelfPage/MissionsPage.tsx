import React from "react";
import { LocaleMessage } from "../../internationalization/components";
import { MissionRequesterQueryItem } from "../../models/mission/image/MissionRequesterQueryItem";
import { MissionState } from "../../models/mission/Mission";
import { MissionCardPane } from "../../components/MyMission/MissionCardPane";



const item = [1,2,3,4,5].map(x =>
  new MissionRequesterQueryItem({
    title: `Title${x}`,
    description: `Description `.repeat(x),
    mission: null,
    state: MissionState.ACTIVE,
    coverUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" //封面url
  })
);

export class MissionsPage extends React.Component<any, any> {
  render() {
    return  <div>
      <h1><LocaleMessage id={"selfCenter.myMissions.title"}/></h1>
      <MissionCardPane items={item}/>
    </div>
  }
}
