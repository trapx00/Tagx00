import React from "react";
import { CanvasLayer } from "./DistrictCanvas/CanvasLayer";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { District, DistrictNotation } from "./Districts";
import { DistrictCanvasContainer } from "./DistrictCanvasContainer";
import { DistrictItemComponent } from "./DistrictItemComponent";

interface DistrictTagPanelProps {
  imageUrl: string;

}

@observer
export class DistrictPanel extends React.Component<DistrictTagPanelProps, {}> {
  @observable addingNotation: boolean = false;
  @observable districts: DistrictNotation[] = [];

  @action addOne = () => {
    this.addingNotation = true;
  };

  @action onDistrictComplete = (dis: District) => {
    this.addingNotation = false;
    this.districts = this.districts.concat([new DistrictNotation(dis)]);
  };

  @action toggleSelect = (district: DistrictNotation) => {
    district.toggleSelect();
    this.districts = this.districts.filter(x => true); // force existing layer refresh
  };

  @action onDistrictClicked = (district: DistrictNotation) => {
    this.toggleSelect(district);
  };

  render() {
    return <div>
      <p>区域标注</p>
      <DistrictCanvasContainer
        drawingMode={this.addingNotation}
        onDistrictComplete={this.onDistrictComplete}
        onDistrictClicked={this.onDistrictClicked}
        districts={this.districts}
        imgUrl={this.props.imageUrl}
      />
      {this.addingNotation
        ? <button disabled>请进行你的标记</button>
        : <button onClick={this.addOne}>增加一个标记</button>
      }

      <p>已有局部：</p>
      {this.districts.map(x => {
        return <DistrictItemComponent key={x.district.id}
                             onSelect={() => this.toggleSelect(x)}
                             district={x}/>
      })}
    </div>;
  }
}
