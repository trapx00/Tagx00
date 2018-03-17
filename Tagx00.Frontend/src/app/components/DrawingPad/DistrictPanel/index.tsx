import React from "react";
import { CanvasLayer } from "./DistrictCanvas/CanvasLayer";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { District } from "./Districts";
import { DistrictCanvasContainer } from "./DistrictCanvas/DistrictCanvasContainer";

interface DistrictTagPanelProps {
  imageUrl: string;

}

@observer
export class DistrictTagPanel extends React.Component<DistrictTagPanelProps, {}> {
  @observable addingNotation: boolean = false;

  @action addOne = () => {
    this.addingNotation = true;
  };

  @action onDistrictComplete = (dis: District) => {
    this.addingNotation = false;
    console.log(dis);
  };

  render() {
    return <div>
      <p>区域标注</p>
      <DistrictCanvasContainer
        drawingMode={this.addingNotation}
        onDistrictComplete={this.onDistrictComplete}
        onDistrictClicked={()=>{}}
        districts={[]}
        imgUrl={this.props.imageUrl}
      />
      {this.addingNotation
        ? <button disabled>请开始你的标记</button>
        : <button onClick={this.addOne}>增加一个标记</button>
      }

      <p>已有局部：</p>
      {/*{this.parts.map(x => {*/}
        {/*return <NotationItem key={x.rectangle.id}*/}
                             {/*onSelect={() => this.toggleSelect(x)}*/}
                             {/*part={x}/>*/}
      {/*})}*/}
    </div>;
  }
}
