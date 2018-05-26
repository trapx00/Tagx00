import React from 'react';
import { AsyncComponent } from "../../../../router/AsyncComponent";
import { Loading } from "../../../../components/Common/Loading";
import { Inject } from "react.di";
import { HttpService } from "../../../../api/HttpService";
import { HttpMethod } from "../../../../api/utils";
import styled from "styled-components";

interface Props {
  url: string;
}

const Container = styled.div`
  max-width: 1000px;
  overflow: auto;
  padding: 8px 8px 8px 8px
`;

export class TextReader extends React.Component<Props, {}> {

  @Inject http: HttpService;

  renderText = async () => {
    const res = await this.http.fetch({
      path: this.props.url,
      method: HttpMethod.GET
    });

    return <Container>
      {JSON.stringify(res.response)}
    </Container>


  };

  render() {
    return <AsyncComponent render={this.renderText} componentWhenLoading={<Loading/>}/>;
  }
}
