import React from 'react';
import { Axis as BizAxis, Axis, Chart as BizChart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataView } from '@antv/data-set';
import styled from "styled-components";

interface Props {
  data: {username: string, value: number}[];
}

export class LeaderboardLineChart extends React.Component<Props,{}>{
  render() {
    const data =  this.props.data;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'sort',
      callback(a, b) {
        return a.value - b.value > 0;
      }
    });

    const Chart = BizChart as any;
    const Axis = BizAxis as any;

   /*
    const Label = styled.div`
      word-wrap: break-word;
    `;*/

    return <div>
      <Chart height={400} data={dv} forceFit>
        <Coord transpose />
        <Axis name="username" label={{offset: 12}} />
        <Axis name="value" />
        <Tooltip />
        <Geom type="interval" position="username*value" />
      </Chart>
    </div>
  }
}
