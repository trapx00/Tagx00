import React, { ReactNode } from 'react';
import { MissionPublicItem } from "../../../models/mission/Mission";
import { LocaleDate, LocaleMessage } from "../../../internationalization/components";
import { Col, Row, Tag } from 'antd';
import { ID_PREFIX, Item } from "./common";
import { OperationBar } from "./OperationBar";
import { Inject } from "react.di";
import { observer } from "mobx-react";
import { UserStore } from "../../../stores/UserStore";
import { computed } from "mobx";
import { UserRole } from "../../../models/user/User";

interface Props {
  publicItem: MissionPublicItem;
  picPanel: ReactNode;
  extraInfo: ReactNode;
}


@observer
export class MissionDetailBasePanel extends React.Component<Props, {}> {

  @Inject userStore: UserStore;


  @computed get showOperationBar() {
    return this.userStore.loggedIn && this.userStore.user.role === UserRole.ROLE_WORKER;
  }

  render() {
    const {missionId, title, jobCount, requesterUsername, allowCustomTag, allowedTags, coverUrl, description, end, missionType, start, topics} =
      this.props.publicItem;
    return <Row gutter={16}>
      <Col md={12} sm={24}>
        {this.props.picPanel}
      </Col>
      <Col md={12} sm={24}>
        <h1>{title}</h1>
        <Item promptTextId={"missionId"}>
          {missionId}
        </Item>
        <Item promptTextId={"topics"}>
          {topics.map(x => <Tag key={x} color={"geekblue"}>{x}</Tag>)}
        </Item>
        <Item promptTextId={"tags"}>
          {allowedTags.map(x => <Tag key={x}>{x}</Tag>)}
          <LocaleMessage id={ID_PREFIX + "allowCustomTag." + allowCustomTag}/>
        </Item>
        <Item promptTextId={"dateRange"}>
          <LocaleMessage id={ID_PREFIX + "dateRangeFormat"} replacements={{
            start: <LocaleDate formatId={ID_PREFIX + "dateFormat"} input={start}/>,
            end: <LocaleDate formatId={ID_PREFIX + "dateFormat"} input={end}/>
          }}/>
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
        {this.props.extraInfo}
        {this.showOperationBar && <OperationBar missionId={missionId}/>}
      </Col>
    </Row>;
  }
}
