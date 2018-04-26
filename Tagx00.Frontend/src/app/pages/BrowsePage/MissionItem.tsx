import React from 'react';
import { Button, List, Tag } from 'antd';
import { Inject } from "react.di";
import { WorkerService } from "../../api/WorkerService";
import { UserStore } from "../../stores/UserStore";
import { Link } from 'react-router-dom';
import { MissionPublicItem } from "../../models/mission/Mission";
import { LocaleDate, LocaleMessage } from "../../internationalization/components";
import { RouterStore } from "../../stores/RouterStore";
import styled from "styled-components";

interface Props {
  item: MissionPublicItem;
}

const ID_PREFIX = "browserMissionList.";

function processTags(topics: string[], missionType: string) {
  return [
    <Tag color="#108ee9"><LocaleMessage id={`${ID_PREFIX}missionType.${missionType}`}/></Tag>,
    ...topics.map(x => <Tag color="geekblue">{x}</Tag>)
  ];
}

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  margin-right: 16px;
`;

const MetaContainer = styled.div`
`;



export class MissionItem extends React.PureComponent<Props, {}> {

  @Inject workerService: WorkerService;
  @Inject userStore: UserStore;
  @Inject routerStore: RouterStore; // link within actions causes error, don't know why

  jumpToDetail = () => {
    const toLink = `/mission?missionId=${this.props.item.missionId}`;
    this.routerStore.jumpTo(toLink);
  };

  render() {
    const {item} = this.props;
    const toLink = `/mission?missionId=${this.props.item.missionId}`;
    return <Row>
        <ImgContainer>
          <img width={272} alt="logo"
             src={item.coverUrl}/>
        </ImgContainer>
      <MetaContainer>
        <List.Item
          actions={[
            <Button type="primary" icon="info" onClick={this.jumpToDetail}>
              <LocaleMessage id={ID_PREFIX + "seeDetail"}/>
            </Button>
          ]}
        >

          <List.Item.Meta
            title={<a onClick={this.jumpToDetail}>{item.title}</a>}
            description={
              <>
                {processTags(item.topics, item.missionType)}
                <span>
              <LocaleDate formatId={ID_PREFIX + "dateFormat"} input={item.start}/>
                  &nbsp;-&nbsp;
                  <LocaleDate formatId={ID_PREFIX + "dateFormat"} input={item.end}/>
            </span>
              </>
            }/>
          {item.description}
        </List.Item>
      </MetaContainer>
    </Row>
  }
}
