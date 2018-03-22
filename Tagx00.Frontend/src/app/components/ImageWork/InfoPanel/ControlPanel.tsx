import React from "react";
import { InfoPanelProps } from "./index";
import { Card, Input, Button, Icon } from 'antd';
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { AddableInputGroup } from "./AddableInputGroup";

@observer
export class ControlPanel extends React.Component<InfoPanelProps, {}> {

  @observable descriptions: string[];

  constructor(props){
    super(props);
    this.descriptions = this.props.tuple
      ? this.props.tuple.descriptions
      : [];
  }

  @action onInputChange = (newItems: string[]) => {
    this.descriptions = newItems;
  };

  render() {
    const style = {
      marginTop: "8px"
    };

    return <div>
      <Card style={style} title={"tags"}>
      </Card>
      <Card style={style} title={"descriptions"}>
        <AddableInputGroup items={this.descriptions}
                           onChange={this.onInputChange}/>

      </Card>
    </div>
  }
}
