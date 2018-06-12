import React from 'react';
import { Gallery } from "../../../components/Gallery";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag } from 'antd';
import { MissionDetailBasePanel } from "./MissionDetailBasePanel";
import { Item } from "./common";
import { ThreeDimensionMissionDetail } from "../../../models/mission/3d/3dMission";

const ID_PREFIX = "missions.missionDetail.THREE_DIMENSION.";

interface Props {
  detail: ThreeDimensionMissionDetail;
}

interface State {
}

export class ThreeDimensionMissionDetailPage extends React.Component<Props, State> {

  render() {

    const {detail} = this.props;



    return <MissionDetailBasePanel publicItem={detail.publicItem}
                                   picPanel={
                                     <Gallery images={[detail.publicItem.coverUrl]}/>
                                   }
    >
      <Item promptTextId={"THREE_DIMENSION.tags"}>
        {detail.publicItem.tags.map(x => <Tag key={x}>{x}</Tag>)}
        <LocaleMessage id={ID_PREFIX + "allowCustomTag." + detail.publicItem.allowCustomTag}/>
      </Item>
    </MissionDetailBasePanel>
  }
}
