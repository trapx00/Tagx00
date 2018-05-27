import React from 'react';
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { Loading } from "../../../../components/Common/Loading";
import { Inject } from "react.di";
import { HttpService } from "../../../../api/HttpService";
import { HttpMethod } from "../../../../api/utils";
import styled from "styled-components";
import { MissionService } from "../../../../api/MissionService";

interface Props {
  textUrl: string;
}

const Container = styled.div`
  max-width: 1000px;
  overflow: auto;
  padding: 8px 8px 8px 8px
`;

export class TextReader extends React.Component<Props, {}> {

  @Inject missionService: MissionService;

  renderText = async () => {
    const text = await this.missionService.getTextByUrl(this.props.textUrl);

    return <Container>
      {text}
    </Container>


  };

  render() {
    return <AsyncComponent render={this.renderText} componentWhenLoading={<Loading/>}/>;
  }
}
