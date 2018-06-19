import React from 'react';
import { Axis as BizAxis, Axis, Chart as BizChart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataView } from '@antv/data-set';
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { PieChart } from "./PieChart";

interface Props {
  inProgress: number;
  submitted: number;
  finalized:number;
  abandoned: number;
}

const ID_PREFIX = "admin.instanceChart.";

export class InstanceCyclePieChart extends React.Component<Props,{}>{
  @Inject localeStore: LocaleStore;
  render() {

    const { inProgress, submitted, finalized, abandoned } = this.props;

    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}${key as string}`) as string;
      }
    });
    const data = [
      { name: locale.inProgressInstanceCount, count: inProgress },
      { name: locale.submittedInstanceCount, count: submitted },
      { name: locale.finalizeInstanceCount, count: finalized},
      { name: locale.abandonedInstanceCount, count: abandoned},
    ];

    return <PieChart title={locale.totalInstanceCount} items={data}/>


  }
}
