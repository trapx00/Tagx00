import React from "react";
import { Localize } from "../../internationalization/components";
import { Tooltip, Icon, Card } from 'antd';

const maxTextCount = 23;

export function truncateText(text: string) {
  return text.length < maxTextCount
    ? text : text.substr(0, maxTextCount) + "...";
}

export const stubCard = <Localize replacements={{
  title: "selfCenter.myMissions.loadingCard"
}}>
  {props =>
    <Card loading title={props.title} style={{width: 300}}>
      Whatever content
    </Card>
  }
</Localize>;


export class CardAction extends React.Component<{ iconType: string, onClick?: () => void, hoverTextId: string }, {}> {

  onClick = () => {
    this.props.onClick && this.props.onClick();
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
