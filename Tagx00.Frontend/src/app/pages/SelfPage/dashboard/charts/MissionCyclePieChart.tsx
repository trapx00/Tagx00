import React from 'react';
import { Axis as BizAxis, Chart as BizChart,Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape } from 'bizCharts';
import { DataView } from '@antv/data-set';

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
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    const cols = {
      percent: {
        formatter: val => {
          val = (val.toFixed(4) * 100) + '%';
          return val;
        }
      }
    }

    const Chart = BizChart as any;
    const Axis = BizAxis as any;

    return <div>
      <Chart height={window.innerHeight/2+100} data={dv} scale={cols} padding={[ 80, 100, 80, 80 ]} forceFit>
        <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Guide >
          <Guide.Html position ={[ '50%', '50%' ]}
                      html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;"> 总任务数 <br> <span style="color:#262626;font-size:2.0em"> ${this.props.totalMissionCount} </span> </div>`}
                      alignX='middle' alignY='middle'/>
        </Guide>
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