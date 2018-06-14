import React from 'react';
import { Axis as BizAxis, Axis, Chart as BizChart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataView } from '@antv/data-set';

interface Props {
  activeInstanceCount:number;
  pendingInstanceCount:number;
  endedInstanceCount:number;
  totalInstanceCount:number;
}

export class InstanceCyclePieChart extends React.Component<Props,{}>{
  render() {
    const data = [
      { item: '正在进行实例数', count: this.props.activeInstanceCount/this.props.totalInstanceCount },
      { item: '已提交实例数', count: this.props.pendingInstanceCount/this.props.totalInstanceCount },
      { item: '已结束实例数', count: this.props.endedInstanceCount/this.props.totalInstanceCount },
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
          return val * this.props.totalInstanceCount;
        }
      }
    };

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
                      html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">总实例数<br><span style="color:#262626;font-size:2.0em">${this.props.totalInstanceCount}</span></div>`}
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
