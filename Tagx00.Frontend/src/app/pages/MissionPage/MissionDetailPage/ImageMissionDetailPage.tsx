import React from 'react';
import { ImageMissionDetail } from "../../../models/mission/image/ImageMission";
import { Gallery } from "../../../components/Gallery";
import { LocaleMessage } from "../../../internationalization/components";
import { Tag } from 'antd';
import { MissionDetailBasePanel } from "./MissionDetailBasePanel";
import { Item } from "./common";
import { flatten, takeAtMost } from "../../../../utils/Array";

const ID_PREFIX = "missions.missionDetail.IMAGE.";

interface Props {
  detail: ImageMissionDetail;
}

interface State {
}

export class ImageMissionDetailPage extends React.Component<Props, State> {

  render() {

    const {detail} = this.props;

    // get some tags
    const tags = flatten(detail.missionAssets.map(x => x.tagConfTuple));
    console.log(tags);


    return <MissionDetailBasePanel publicItem={detail.publicItem}
                                   picPanel={<Gallery images={[detail.publicItem.coverUrl, ...detail.missionAssets.map(x=> x.url)]}/>}
    >
      <Item promptTextId={"IMAGE.tags"}>
        {takeAtMost(tags, 5).map(x => <Tag key={x.tag}>{x.tag}</Tag>)}
        <LocaleMessage id={ID_PREFIX + "allowCustomTag." + detail.publicItem.allowCustomTag}/>
      </Item>
      <Item promptTextId={"IMAGE.imageMissionTypes"}>
        {detail.publicItem.imageMissionTypes.map(x => <Tag key={x}><LocaleMessage
          id={ID_PREFIX + "types." + x}/></Tag>)}
      </Item>
    </MissionDetailBasePanel>
  }
}
