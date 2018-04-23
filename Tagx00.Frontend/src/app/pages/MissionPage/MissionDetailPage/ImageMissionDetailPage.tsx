import React, { ReactNode } from 'react';
import { ImageMissionDetail } from "../../../models/mission/image/ImageMission";
import { Gallery } from "../../../components/Gallery";
import { LocaleDate, LocaleMessage } from "../../../internationalization/components";
import { Tag, Input, Icon } from 'antd';
import styled from "styled-components";
import { MissionDetailBasePanel } from "./MissionDetailBasePanel";
import { Item } from "./common";
const ID_PREFIX = "missions.missionDetail.IMAGE.";

interface Props {
  detail: ImageMissionDetail;
}

interface State {
}

export class ImageMissionDetailPage extends React.Component<Props, State> {

  render() {

    const {detail} = this.props;
    return <MissionDetailBasePanel publicItem={detail.publicItem}
                                   picPanel={<Gallery images={[detail.publicItem.coverUrl, ...detail.imageUrls]}/>}
                                   extraInfo={
                                     <Item promptTextId={"IMAGE.imageMissionTypes"}>
                                       {detail.imageMissionTypes.map(x => <Tag key={x}><LocaleMessage
                                         id={ID_PREFIX + "types." + x}/></Tag>)}
                                     </Item>}/>
  }
}
