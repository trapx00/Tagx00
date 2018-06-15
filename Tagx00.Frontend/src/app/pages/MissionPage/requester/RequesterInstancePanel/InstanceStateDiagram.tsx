import React from 'react';
import { Axis as BizAxis, Axis, Chart as BizChart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { Instance } from "../../../../models/instance/Instance";
import { DataView } from '@antv/data-set';
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { MissionInstanceState } from "../../../../models/instance/MissionInstanceState";


interface Props {
  instances: Instance[];
}

const ID_PREFIX = "missions.requester.instancePanel.instanceStateDiagram.";

export class InstanceStateDiagram extends React.Component<Props, {}> {

  @Inject localeStore: LocaleStore;

  render() {
    const { instances } = this.props;

    const data = Object.keys(MissionInstanceState).map(x => ({
      item: this.localeStore.get(ID_PREFIX+x),
      count: instances.filter(i => i.missionInstanceState === MissionInstanceState[x]).length / this.props.instances.length
    }));

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
          return val * this.props.instances.length
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
                      html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">${this.localeStore.get(ID_PREFIX+"total")}<br><span style="color:#262626;font-size:2.0em">${this.props.instances.length}</span></div>`}
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
