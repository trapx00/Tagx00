import React from 'react';
import { Axis as BizAxis, Chart as BizChart, Geom, Tooltip, Axis } from 'bizCharts';
import { DataView } from '@antv/data-set';

interface Props {
  data: { date: string, count: number}[];
}

export class UserRegisterChart extends React.Component<Props, {}> {
  render() {

    const cols = {
      'count': { min: 0 },
      'date': {range: [ 0 , 1] }
    };

    return  <BizChart height={400} data={this.props.data} scale={cols} forceFit>
      <Axis name="date" />
      <Axis name="count" />
      <Tooltip crosshairs={{type : "y"}}/>
      <Geom type="line" position="date*count" size={2} />
      <Geom type='point' position="date*count" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
    </BizChart>
  }
}
