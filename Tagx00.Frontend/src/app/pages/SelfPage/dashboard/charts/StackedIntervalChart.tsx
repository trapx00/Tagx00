import React from 'react';
import { Axis, Chart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataSet } from '@antv/data-set';

interface Props {
  data: {name: string, data: {[s: string]: number}[]}[];
}

export class StackedIntervalChart extends React.Component<Props, {}> {
  render() {


    const data = this.props.data.map(x => ({name: x.name, ...x.data}));
    console.log(data);

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: Object.keys(this.props.data[0].data), // 展开字段集
      key: 'x', // key字段
      value: 'y', // value字段
    });

    return <Chart height={400} data={dv} forceFit>
      <Legend />
      <Axis name="x" />
      <Axis name="y" />
      <Tooltip />
      <Geom type='intervalStack' position="x*y" color={'name'} style={{stroke: '#fff',lineWidth: 1}} />
    </Chart>;
  }
}
