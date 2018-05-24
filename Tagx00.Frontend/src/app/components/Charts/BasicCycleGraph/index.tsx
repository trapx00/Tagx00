import * as React from "react";
import { DataView } from "@antv/data-set";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

export class BasicCycleGraph extends React.Component<BasicCycleGraph, any> {

    render() {
        const data = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
            {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
            {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

        return (
            <PieChart width={800} height={400}>
                <Pie data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
                <Tooltip/>
            </PieChart>
        );
    }
}
