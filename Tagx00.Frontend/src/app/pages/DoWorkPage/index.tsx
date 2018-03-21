import React from "react";

interface Props {
  missionId: number;
}

export class DoWorkPage extends React.Component<Props, any> {
  render() {
    return this.props.missionId;
  }
}
