import React from 'react';
import { TextMissionDetail } from "../../../models/mission/text/TextMissionDetail";
import { MissionDetailBasePanel } from "./MissionDetailBasePanel";
import { Gallery } from "../../../components/Gallery";
import { Item } from "./common";
import { Tag } from 'antd';
import {
  TextMissionClassificationSetting, TextMissionKeywordsSettings,
  TextMissionSetting,
  TextMissionType
} from "../../../models/mission/text/TextMissionProperties";
import { LocaleMessage } from "../../../internationalization/components";

interface Props {
  detail: TextMissionDetail;
}

const ID_PREFIX = "missions.missionDetail.TEXT.";

function generateSettingElements(setting: TextMissionSetting) {
  switch (setting.textMissionType) {
    case TextMissionType.CLASSIFICATION:
      return <Item promptTextId={"TEXT.CLASSIFICATION.classes"}>
        {(setting as TextMissionClassificationSetting)
          .classes.map(x => <Tag key={x}>{x}</Tag>)}
      </Item>;
    case TextMissionType.KEYWORDS:
      return <Item promptTextId={"TEXT.KEYWORDS.keywords"}>
        {(setting as TextMissionKeywordsSettings)
          .keywords.map(x => <Tag key={x}>{x}</Tag>)
        }
      </Item>
  }
}

export class TextMissionDetailPage extends React.Component<Props, {}> {
  render() {

    const { detail } = this.props;
    return <MissionDetailBasePanel publicItem={detail.publicItem}
                                   picPanel={<Gallery images={[detail.publicItem.coverUrl]}/>}>
      <Item promptTextId={"TEXT.types"}>
        { detail.publicItem.missionTypes.map(x => <Tag key={x}><LocaleMessage id={`${ID_PREFIX}${x}.name`}/></Tag>)}
      </Item>
      { detail.settings.map(generateSettingElements)}
    </MissionDetailBasePanel>
  }
}
