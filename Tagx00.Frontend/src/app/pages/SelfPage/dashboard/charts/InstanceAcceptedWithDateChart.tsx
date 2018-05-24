import React from 'react';
import { InstancesAcceptedPerDate } from "../../../../models/userInfo/AdminInfo";
import { Axis as BizAxis, Chart as BizChart, Geom, Tooltip } from 'bizCharts';

interface Props {
  data: InstancesAcceptedPerDate[];
}

export class MissionDateChart extends React.Component<Props, {}> {
  render() {
    const cols = {
      date: { alias: '日期' },
      num: { alias: '积累量' }
    };

    const Chart = BizChart as any;
    const Axis = BizAxis as any;

    return <div>
      <Chart height={400} data={this.props.data} scale={cols} forceFit>
      <Axis name="date" title={null} tickLine={null} line={{ stroke: '#E6E6E6'}} />
      <Axis name="num" line={false} tickLine={null} grid={null} title={null}  />
      <Tooltip />
      <Geom type="line" position="date*num" size={1} color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)" shape="smooth"
            style={{
              shadowColor: 'l (270) 0:rgba(21, 146, 255, 0)',
              shadowBlur: 60,
              shadowOffsetY: 6
            }}
      />
    </Chart>
    </div>
  }
}
