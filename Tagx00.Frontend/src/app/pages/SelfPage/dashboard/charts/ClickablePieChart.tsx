import React from 'react';
import { Axis, Chart as BizChart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataView } from '@antv/data-set';
import { Axis as BizAxis } from "bizcharts";
import { arraySum } from "../../../../../utils/Array";

interface PieChartItem<T> {
  name: string;
  items: T[];
}

interface Props<T> {
  title: string;
  items: PieChartItem<T>[];
  onClick?(item: PieChartItem<T>): void;
}

export class ClickablePieChart<T> extends React.Component<Props<T>, {}> {


  onClick = (e) => {
    if (this.props.onClick){
      const key = e.data._origin.item;

      this.props.onClick(this.props.items.find(x => x.name === key));
    }

  };

  render() {

    const total = arraySum(this.props.items, x=> x.items.length);
    const data=  this.props.items.map(x => ({ item: x.name, count: x.items.length / total}));

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
          return val * total;
        }
      }
    };

    const Chart = BizChart as any;
    const Axis = BizAxis as any;

    return <div>
      <Chart height={600} data={dv} scale={cols} forceFit onIntervalClick={this.onClick} >
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
