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

export const DEFAULT_COVER_URL= "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529316137448&di=3908339d93277baf2e5486f7732eb326&imgtype=0&src=http%3A%2F%2Fwww.taopic.com%2Fuploads%2Fallimg%2F140421%2F318743-140421213T910.jpg";


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
