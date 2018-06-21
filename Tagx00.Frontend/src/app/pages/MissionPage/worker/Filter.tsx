import React from 'react';
import { MissionInstanceSearch } from "../requester/RequesterInstancePanel/MissionInstanceSearch";
import { MissionInstanceState } from "../../../models/instance/MissionInstanceState";
import { Tag } from 'antd';
import { LocaleMessage } from "../../../internationalization/components";
import { objectValues } from "../../../../utils/Array";
const CheckableTag = Tag.CheckableTag;

interface Props {
  states: MissionInstanceState[];
  onChange(states: MissionInstanceState[]): void;
}

const ID_PREFIX= "common.instanceState.";

export class Filter extends React.Component<Props, {}> {


  onClick = (tag: MissionInstanceState, checked: boolean) => {
    if (checked) {
      this.props.onChange([...this.props.states, tag]);
    } else {
      this.props.onChange(this.props.states.filter(x => x !== tag));
    }
  };

  render() {
    return <div style={{marginBottom: "8px"}}>
      {objectValues(MissionInstanceState).map(x =>
        <CheckableTag key={x}
                      checked={this.props.states.indexOf(x) >= 0}
                      onChange={(checked) => this.onClick(x,checked)}
        ><LocaleMessage id={ID_PREFIX+x}/>
        </CheckableTag>
        )}
    </div>
  }
}
