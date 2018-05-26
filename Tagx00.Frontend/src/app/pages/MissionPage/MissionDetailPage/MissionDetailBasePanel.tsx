import React, { ReactNode } from 'react';
import { LocaleDate, LocaleMessage } from "../../../internationalization/components";
import { Col, Row, Tag } from 'antd';
import { ID_PREFIX, Item } from "./common";
import { OperationBar } from "./OperationBar";
import { Inject } from "react.di";
import { observer } from "mobx-react";
import { UserStore } from "../../../stores/UserStore";
import { computed } from "mobx";
import { UserRole } from "../../../models/user/User";
import styled from "styled-components";
import { MissionPublicItem } from "../../../models/mission/MissionPublicItem";

interface Props {
  publicItem: MissionPublicItem;
  picPanel: ReactNode;
}

const Title = styled.h1`
  margin-bottom: 16px;
`;

@observer
export class MissionDetailBasePanel extends React.Component<Props, {}> {

  @Inject userStore: UserStore;


  @computed get showOperationBar() {
    return this.userStore.loggedIn && this.userStore.user.role === UserRole.ROLE_WORKER;
  }

  render() {
    const {missionId, title, jobCount, requesterUsername, coverUrl, description, end, missionType, start, topics, minimalWorkerLevel, level, credits} =
      this.props.publicItem;
    return <Row gutter={32}>
      <Col md={12} sm={24}>
        {this.props.picPanel}
      </Col>
      <Col md={12} sm={24}>
        <Title>{title}</Title>
        <Item promptTextId={"missionId"}>
          {missionId}
        </Item>
        <Item promptTextId={"topics"}>
          {topics.map(x => <Tag key={x} color={"geekblue"}>{x}</Tag>)}
        </Item>
        <Item promptTextId={"dateRange"}>
          <LocaleMessage id={ID_PREFIX + "dateRangeFormat"} replacements={{
            start: <LocaleDate formatId={ID_PREFIX + "dateFormat"} input={start}/>,
            end: <LocaleDate formatId={ID_PREFIX + "dateFormat"} input={end}/>
          }}/>
        </Item>
        <Item promptTextId={"jobCount"}>
          {jobCount}
        </Item>
        <Item promptTextId={"minimalWorkerLevel"}>
          {minimalWorkerLevel}
        </Item>
        <Item promptTextId={"level"}>
          {level}
        </Item>
        <Item promptTextId={"credits"}>
          {credits}
        </Item>
        <Item promptTextId={"description"}>
          {description}
        </Item>
        <Item promptTextId={"requesterUsername"}>
          {requesterUsername}
        </Item>
        <Item promptTextId={"missionType"}>
          <LocaleMessage id={ID_PREFIX + missionType + ".name"}/>
        </Item>
        {this.props.children}
        {this.showOperationBar && <OperationBar missionPublicItem={this.props.publicItem}/>}
      </Col>
    </Row>;
  }
}
