import * as React from "react";
import {Tool} from "./Tool";
import {action, observable} from "mobx";
import {observer} from "mobx-react";

interface LayerProps {
  width: number;
  height: number;
  getTool: (context: CanvasRenderingContext2D) => Tool;
  zIndex: number;
}

export class Layer extends React.Component<LayerProps, any>{

  canvas: HTMLCanvasElement;
  tool: Tool;

  getCursorPosition(e) : [number, number] {
    const {top, left} = this.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  onMouseDown = (e) => {
    const position = this.getCursorPosition(e);
    this.tool.onMouseDown(position[0], position[1]);
  };

  onMouseMove = (e) => {
    const position = this.getCursorPosition(e);
    this.tool.onMouseMove(position[0], position[1]);
  };

  onMouseUp = (e) => {
    const position = this.getCursorPosition(e);
    this.tool.onMouseUp(position[0], position[1]);
  };

  ref = (ref) => {
    this.canvas = ref;
    this.tool = this.props.getTool(ref.getContext("2d"));
  };


  render() {
    console.log(this.tool);
    return <canvas
      ref={this.ref}
      style={{zIndex: this.props.zIndex, position: "absolute"}}
      width={this.props.width}
      height={this.props.height}
      onMouseDown={this.onMouseDown}
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}
    >
      Your browser doesn't support canvas.
    </canvas>
  }
}