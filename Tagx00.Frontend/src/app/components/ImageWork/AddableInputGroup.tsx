import React from "react";
import { Input, Icon, Button } from 'antd';
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { removeElementAt } from "../../../utils/Array";

interface Props {
  items: string[];
  onChange: (newItems: string[]) => void;
}

@observer
export class AddableInputGroup extends React.Component<Props, any> {

  @observable items: string[] = this.props.items;

  @action onInputChange = (newValue: string, index: number) => {
    this.items[index] = newValue;
    this.callOnChange();
  };

  @action addADescription = () => {
    this.items.push("");
    this.callOnChange();
  };

  @action removeOne = (index: number) => {
    removeElementAt(this.items, index);
    this.callOnChange();
  };

  callOnChange() {
    this.props.onChange(this.items);
  }

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
