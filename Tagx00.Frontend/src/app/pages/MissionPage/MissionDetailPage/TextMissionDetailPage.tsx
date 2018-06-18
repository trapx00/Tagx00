import React from 'react';
import { TextMissionDetail } from "../../../models/mission/text/TextMissionDetail";
import { MissionDetailBasePanel } from "./MissionDetailBasePanel";
import { Gallery } from "../../../components/Gallery";
import { Item, PicPanelTabs } from "./common";
import { Tag } from 'antd';
import {
  TextMissionClassificationSetting, TextMissionKeywordsSetting,
  TextMissionSetting,
  TextMissionType
} from "../../../models/mission/text/TextMissionProperties";
import { LocaleMessage } from "../../../internationalization/components";
import { AudioPlayer } from "../../../components/Mission/AudioPlayer";
import { TextReader } from "../../../components/Mission/WorkPageSuite/TextReader";

interface Props {
  detail: TextMissionDetail;
}

const ID_PREFIX = "missions.missionDetail.TEXT.";

function generateSettingElements(setting: TextMissionSetting) {
  switch (setting.textMissionType) {
    case TextMissionType.CLASSIFICATION:
      return <Item key={"TEXT.CLASSIFICATION.classes"} promptTextId={"TEXT.CLASSIFICATION.classes"}>
        {(setting as TextMissionClassificationSetting)
          .classes.map(x => <Tag key={x}>{x}</Tag>)}
      </Item>;
    case TextMissionType.KEYWORDS:
      return <Item key={"TEXT.KEYWORDS.keywords"} promptTextId={"TEXT.KEYWORDS.keywords"}>
        {(setting as TextMissionKeywordsSetting)
          .keywords.map(x => <Tag key={x}>{x}</Tag>)
        }
      </Item>
  }
}

export class TextMissionDetailPage extends React.Component<Props, {}> {
  render() {

    const { detail } = this.props;
    return <MissionDetailBasePanel publicItem={detail.publicItem}
                                   picPanel={
                                     <PicPanelTabs titleId={ID_PREFIX+"sampleTitle"} titleIcon={"file-text"} coverUrl={detail.publicItem.coverUrl}>
                                       <TextReader textToken={detail.tokens[0]} missionId={detail.publicItem.missionId}/>
                                     </PicPanelTabs>
                                   }>
      <Item promptTextId={"TEXT.types"}>
        { detail.publicItem.missionTypes.map(x => <Tag key={x}><LocaleMessage id={`${ID_PREFIX}${x}.name`}/></Tag>)}
      </Item>
      { detail.settings.map(generateSettingElements)}
    </MissionDetailBasePanel>
  }
}
