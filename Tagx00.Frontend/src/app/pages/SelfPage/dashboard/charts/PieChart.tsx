import React from 'react';
import { Axis as BizAxis, Axis, Chart as BizChart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataView } from '@antv/data-set';
import { arraySum } from "../../../../../utils/Array";

interface PieChartItem {
  name: string;
  count: number;
}



interface Props {
  title: string;
  items: PieChartItem[];
}

export class PieChart extends React.Component<Props, {}> {


  render() {

    const total = arraySum(this.props.items, x=> x.count);
    const data=  this.props.items.map(x => ({ item: x.name, count: x.count / total}));

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
          const r = val * total;
          if (r-Math.floor(r)<0.1) {
            return Math.floor(r);
          }
          if (Math.ceil(r)-r<0.1) {
            return Math.ceil(r);
          }
          return r;
        }
      }
    };

    const Chart = BizChart as any;
    const Axis = BizAxis as any;

    return <div>
      <Chart height={600} data={dv} scale={cols} forceFit>
        <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Guide >
          <Guide.Html position ={[ '50%', '50%' ]}
                      html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;"> ${this.props.title} <br> <span style="color:#262626;font-size:2.0em"> ${total} </span> </div>`}
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
