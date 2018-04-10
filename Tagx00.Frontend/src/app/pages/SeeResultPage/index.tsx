import React from 'react';
import { DoWorkPage } from "../DoWorkPage";

interface Props {
  missionId: number;
}

export class SeeResultPage extends React.Component<Props, {}> {


  render() {
    return <DoWorkPage missionId={this.props.missionId} readonly={true}/>;
  }
}
