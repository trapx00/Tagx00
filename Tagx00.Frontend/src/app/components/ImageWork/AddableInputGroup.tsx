import React from "react";
import { Input, Icon, Button } from 'antd';
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { removeElementAt } from "../../../utils/Array";

interface Props {
  items: string[];
  onChange: (newItems: string[]) => void;
}

export class AddableInputGroup extends React.Component<Props, any> {


  onInputChange = (newValue: string, index: number) => {
    const items = this.props.items.slice();
    items[index] = newValue;
    this.props.onChange(items);

  };

  addADescription = () => {
    this.props.onChange(this.props.items.concat([""]));
  };

  removeOne = (index: number) => {
    const items = this.props.items.slice();
    items.splice(index,1);
    this.props.onChange(items);
  };

  render() {
    return <>
      {this.props.items.map((x, index) =>
        <Input placeholder={"input description"}
               value={x}
               key={index}
               onChange={(e) => this.onInputChange(e.target.value, index)}
               addonAfter={<Icon type="minus-circle-o" onClick={() => this.removeOne(index)}/>}
        />)
      }
      <Button type="dashed" onClick={this.addADescription}>Add one</Button>
    </>;

  }
}
