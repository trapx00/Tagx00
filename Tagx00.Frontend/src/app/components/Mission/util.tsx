import React from "react";
import { Localize } from "../../internationalization/components";
import { Card, Icon, Tooltip } from 'antd';

const maxTextCount = 23;

export function truncateText(text: string) {
  return text.length < maxTextCount
    ? text : text.substr(0, maxTextCount) + "...";
}

const ID_PREFIX = "missions.worker.myMissions.";

export const stubCard = <Localize replacements={{
  title: ID_PREFIX + "loadingCard"
}}>
  {props =>
    <Card loading title={props.title} style={{width: 300}}>
      Whatever content
    </Card>
  }
</Localize>;

interface Props {
  iconType: string;

  onClick?(e): void;

  hoverTextId: string;
}


export class CardAction extends React.Component<Props, {}> {

  onClick = (e) => {
    this.props.onClick && this.props.onClick(e);
  };

  render() {
    return <Localize replacements={{title: this.props.hoverTextId}}>
      {props =>
        <Tooltip arrowPointAtCenter placement="topLeft" title={props.title}>
          <Icon type={this.props.iconType} onClick={this.onClick}/>
        </Tooltip>
      }
    </Localize>
  }

}
