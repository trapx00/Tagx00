import React from 'react';
import { Axis as BizAxis, Chart as BizChart, Geom, Tooltip } from 'bizCharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import styled from "styled-components";
import { message } from 'antd';

const Container = styled.div`
.color-empty { fill: #EBECEF; }
.color-scale-1 { fill: #d6e685; }
.color-scale-2 { fill: #8cc665; }
.color-scale-3 { fill: #44a340; }
.color-scale-4 { fill: #1e6823; } 
text {
  font-size: 8px;
  fill: #aaaaaa;
}
rect {
:hover {
stroke-width:0.5px;
  stroke: #333333;
}
} 
`;

interface Props {
  data: {[date: string]: string[]};
}

export class InstanceHeatMap extends React.Component<Props, {}> {


  onClick = (value: {date: string, count: number}) => {
    if (value) {
      message.info(`${value.date}: ${value.count}`);
    }
  };

  render() {

    console.log(this.props.data);

    return <Container>
      <CalendarHeatmap
        values={Object.keys(this.props.data).map(x => ({date: x, count: this.props.data[x].length}))}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${Math.ceil(value.count / 5)}`;
        }}
        onClick={this.onClick}
      />
    </Container>
  }
}
