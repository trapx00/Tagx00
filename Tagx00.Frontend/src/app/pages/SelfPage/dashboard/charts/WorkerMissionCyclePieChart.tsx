import React from 'react';
import { Axis as BizAxis, Axis, Chart as BizChart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataView } from '@antv/data-set';
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";

interface Props {
  acceptMissionCount:number,
  inProgressMissionCount:number,
  completedMissionCount:number,
  abandonedMissionCount:number,
  finalizedMissionCount:number
}

const ID_PREFIX = "dashboard.worker.";

export class WorkerMissionCyclePieChart extends React.Component<Props,{}>{
  @Inject localeStore: LocaleStore;

  render() {
    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}${key as string}`) as string;
      }
    });
    const data = [
      { item: locale.inProgressMissionCount, count: this.props.inProgressMissionCount/this.props.acceptMissionCount },
      { item: locale.completedMissionCount, count: this.props.completedMissionCount/this.props.acceptMissionCount },
      { item: locale.finalizedMissionCount, count: this.props.finalizedMissionCount/this.props.acceptMissionCount },
      { item: locale.abandonedMissionCount, count: this.props.abandonedMissionCount/this.props.acceptMissionCount },
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
          return val * this.props.acceptMissionCount;
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
                      html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">已接受任务数<br><span style="color:#262626;font-size:2.0em">${this.props.acceptMissionCount}</span></div>`}
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
