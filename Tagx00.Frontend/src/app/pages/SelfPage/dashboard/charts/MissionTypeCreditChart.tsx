import React from 'react';
import { Axis as BizAxis, Axis, Chart as BizChart, Coord, Geom as BizGeom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataView } from '@antv/data-set';
interface Props {

  data: {type: string, low: number, q1: number, median: number, q3:number, high: number}[];
}

export class MissionTypeCreditChart extends React.Component<Props, {}> {



  render() {

    const dv = new DataView().source(this.props.data);
    dv.transform({
      type: 'map',
      callback: (obj) => {
        obj.range = [ obj.low, obj.q1, obj.median, obj.q3, obj.high ];
        return obj;
      }
    });
    const cols ={
      range: {
        max: 35
      }
    };

    const Geom = BizGeom as any;

    const Chart = BizChart as any;

    return <Chart height={800} data={dv} forceFit>
      <Axis name='type' />
      <Axis name='range' />
      <Tooltip showTitle={false} crosshairs={{type:'rect',style: {fill: '#E4E8F1',fillOpacity: 0.43}}}
               itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">最大值：{high}</span><br/><span style="padding-left: 16px">上四分位数：{q3}</span><br/><span style="padding-left: 16px">中位数：{median}</span><br/><span style="padding-left: 16px">下四分位数：{q1}</span><br/><span style="padding-left: 16px">最小值：{low}</span><br/></li>'/>

      <Geom type="schema" position="type*range" shape='box' tooltip={['type*low*q1*median*q3*high', (type, low, q1, median, q3, high) => {
        return {
          name: type,
          low,
          q1,
          median,
          q3,
          high
        };
      }]}
            style={{stroke: 'rgba(0, 0, 0, 0.45)',fill: '#1890FF',fillOpacity: 0.3}}
      />

    </Chart>;
  }
}
