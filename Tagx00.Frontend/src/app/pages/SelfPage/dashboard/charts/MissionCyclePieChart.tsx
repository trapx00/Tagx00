import React from 'react';
import {  Axis as BizAxis, Chart as BizChart,Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizCharts';

interface Props {
  activeMissionCount:number;
  pendingMissionCount:number;
  endedMissionCount:number;
  totalMissionCount:number;
}

export class MissionCyclePieChart extends React.Component<Props,{}>{
  render() {
    const data = [
      { item: '可接受任务数', count: this.props.activeMissionCount/this.props.totalMissionCount },
      { item: '未到时间任务数', count: this.props.pendingMissionCount/this.props.totalMissionCount },
      { item: '结束任务数', count: this.props.endedMissionCount/this.props.totalMissionCount },
      { item: '总任务数', count: this.props.totalMissionCount/this.props.totalMissionCount }
    ];
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    };

    const Chart = BizChart as any;
    const Axis = BizAxis as any;

    return <div>
     <Chart height={window.innerHeight} data={data} scale={cols} padding={[ 80, 100, 80, 80 ]} forceFit>
        <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Tooltip/>
        <Geom
          type="intervalStack"
          position="percent"
          color='item'
          tooltip={['item*percent',(item, percent) => {
            percent = percent * 100 + '%';
            return {
              name: item,
              value: percent
            };
          }]}
          style={{lineWidth: 1,stroke: '#fff'}}
        >
          <Label content='percent' formatter={(val, item) => {
            return item.point.item + ': ' + val;}} />
        </Geom>
      </Chart>
   </div>
  }
}