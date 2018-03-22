import React, { CSSProperties } from 'react';
import { TagDescriptionTuple } from "../../../models/instance/TagDescriptionTuple";
import { Card } from 'antd';
import { ClickableTag } from "../../ClickableTag";
import { ControlPanel } from "./ControlPanel";
import { ImageNotation } from "../../../stores/ImageWorkStore";
import { ImageJob } from "../../../models/instance/image/job/ImageJob";
import { ImageMissionDetail } from "../../../models/mission/ImageMission";
import { MissionTipCard } from "./MissionTipCard";

export interface InfoPanelProps {
  tuple: TagDescriptionTuple;
  onChange: (tuple: TagDescriptionTuple) => void;
  job: ImageJob;
  mission: ImageMissionDetail;
}

export class InfoPanel extends React.Component<InfoPanelProps, any> {
  render() {
    return <div>
      <MissionTipCard {...this.props}/>
      <ControlPanel {...this.props}/>
      {this.props.tuple}
    </div>
  }
}
