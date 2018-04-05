import React from "react";
import { Button, Divider, List, message, Pagination, Spin } from "antd";
import { Localize } from "../../../internationalization/components";
import { BrowserStore } from "../BrowserStore";
import { observer } from "mobx-react";
import { Response } from "../../../models/Response";
import { WorkerService } from "../../../api/WorkerService";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";

const centerDivider = {
  marginTop: '-10%',
  marginBottom: '10%'
};

const HasIdButton: any = Button;


@observer
export class BrowserMissionList extends React.Component<any, {}> {
  
  @Inject browserStore: BrowserStore;
  @Inject userStore: UserStore;
  @Inject workerService: WorkerService;
  
  handleAccept = async (e) => {
    const response: Response = await this.workerService.acceptMission(e.target.id, this.userStore.token);
    if (response.infoCode === 10000) {
      message.success('任务接受成功');
    }
  };

  render() {
    if (this.browserStore.isBrowsing) {
      if (this.browserStore.listData.length == 0) {
        return <div style={{textAlign: 'center', marginTop: '-10%'}}><Spin size="large"/></div>;
      }
      else {
        return (
          <Localize replacements={{dividerText: "browserMissionList.dividerText"}}>{
            (props) => {
              return <div>
                <Divider style={centerDivider}>{props.dividerText}</Divider>
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={false}
                  dataSource={this.browserStore.listData}
                  renderItem={item => (
                    <List.Item
                      key={item.missionId}
                      actions={[<HasIdButton type="primary" ghost={true} size="small" icon="check"
                                             onClick={this.handleAccept} id={item.missionId}/>,
                        <HasIdButton size="small" shape="circle" icon="ellipsis"/>]}
                      extra={<img width={272} alt="logo"
                                  src={item.coverUrl}/>}
                    >
                      <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.tags}
                      />
                      {item.description}
                      <div style={{textAlign: 'right'}}>{item.startDate}</div>
                    </List.Item>
                  )}
                />
                <div style={{textAlign: 'center'}}>
                  <Pagination defaultCurrent={1} total={1}/>
                </div>
              </div>
            }
          }</Localize>)
      }
    } else {
      return null;
    }
  }
}
