import React from 'react';
import { Gallery } from "../../../components/Gallery";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag, Tabs, Icon } from 'antd';
import { MissionDetailBasePanel } from "./MissionDetailBasePanel";
import { Item, PicPanelTabs } from "./common";
import { AudioMissionDetail } from "../../../models/mission/audio/AudioMission";
import { AudioPlayer } from "../../../components/Mission/AudioPlayer";

const ID_PREFIX = "missions.missionDetail.AUDIO.";

const TabPane = Tabs.TabPane;

interface Props {
  detail: AudioMissionDetail;
}

interface State {
}

export class AudioMissionDetailPage extends React.Component<Props, State> {

  render() {

    const {detail} = this.props;


    return <MissionDetailBasePanel publicItem={detail.publicItem}
                                   picPanel={
                                     <PicPanelTabs titleId={ID_PREFIX+"sampleTitle"} titleIcon={"sound"} coverUrl={detail.publicItem.coverUrl}>
                                       <AudioPlayer url={detail.audioUrls[0]}/>
                                     </PicPanelTabs>
                                   }
    >
      <Item promptTextId={"AUDIO.tags"}>
        {detail.publicItem.tags.map(x => <Tag key={x}>{x}</Tag>)}
        <LocaleMessage id={ID_PREFIX + "allowCustomTag." + detail.publicItem.allowCustomTag}/>
      </Item>
      <Item promptTextId={"AUDIO.audioMissionTypes"}>
        {detail.publicItem.audioMissionTypes.map(x => <Tag key={x}><LocaleMessage
          id={ID_PREFIX + "types." + x}/></Tag>)}
      </Item>
    </MissionDetailBasePanel>
  }
}
