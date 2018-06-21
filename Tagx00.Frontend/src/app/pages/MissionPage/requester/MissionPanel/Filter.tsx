import React from 'react';
import { Tag } from 'antd';
import { MissionState } from "../../../../models/mission/Mission";
import { MissionInstanceState } from "../../../../models/instance/MissionInstanceState";
import { objectValues } from "../../../../../utils/Array";
import { LocaleMessage } from "../../../../internationalization/components";
const CheckableTag = Tag.CheckableTag;

interface Props {
  states: MissionState[];
  onChange(states: MissionState[]): void;
}

const ID_PREFIX= "common.missionState.";

export class Filter extends React.Component<Props, {}> {


  onClick = (tag: MissionState, checked: boolean) => {
    if (checked) {
      this.props.onChange([...this.props.states, tag]);
    } else {
      this.props.onChange(this.props.states.filter(x => x !== tag));
    }
  };

  render() {
    return <div style={{marginBottom: "8px"}}>
      {objectValues(MissionState).map(x =>
        <CheckableTag key={x}
                      checked={this.props.states.indexOf(x) >= 0}
                      onChange={(checked) => this.onClick(x,checked)}
        ><LocaleMessage id={ID_PREFIX+x}/>
        </CheckableTag>
      )}
    </div>
  }
}
