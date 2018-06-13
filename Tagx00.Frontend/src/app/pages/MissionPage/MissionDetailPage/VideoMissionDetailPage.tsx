import React from 'react';
import { ImageMissionDetail } from "../../../models/mission/image/ImageMission";
import { Gallery } from "../../../components/Gallery";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag } from 'antd';
import { MissionDetailBasePanel } from "./MissionDetailBasePanel";
import { Item, PicPanelTabs } from "./common";
import { flatten, takeAtMost } from "../../../../utils/Array";
import { VideoMissionDetail } from "../../../models/mission/video/VideoMission";
import { VideoPlayer } from "../../../components/Mission/VideoPlayer";

const ID_PREFIX = "missions.missionDetail.VIDEO.";

interface Props {
  detail: VideoMissionDetail;
}

interface State {
}

export class VideoMissionDetailPage extends React.Component<Props, State> {

  render() {

    const {detail} = this.props;
    


    return <MissionDetailBasePanel publicItem={detail.publicItem}
                                   picPanel={
                                     <PicPanelTabs titleId={ID_PREFIX+"sampleTitle"} titleIcon={"sound"} coverUrl={detail.publicItem.coverUrl}>
                                       <VideoPlayer url={detail.videoUrls[0]}/>
                                     </PicPanelTabs>
                                   }
    >
      <Item promptTextId={"VIDEO.tags"}>
        {detail.publicItem.tags.map(x => <Tag key={x}>{x}</Tag>)}
        <LocaleMessage id={ID_PREFIX + "allowCustomTag." + detail.publicItem.allowCustomTag}/>
      </Item>
      <Item promptTextId={"VIDEO.videoMissionTypes"}>
        {detail.videoMissionTypes.map(x => <Tag key={x}><LocaleMessage
          id={ID_PREFIX + "types." + x}/></Tag>)}
      </Item>
    </MissionDetailBasePanel>
  }
}
