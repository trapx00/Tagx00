import React from "react";
import { Divider, List, Pagination, Spin } from "antd";
import QueueAnim from 'rc-queue-anim';
import { LocaleMessage } from "../../internationalization/components";
import { BrowserStore } from "../../stores/BrowserStore";
import { observer } from "mobx-react";
import { WorkerService } from "../../api/WorkerService";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { MissionItem } from "./MissionItem";
import { LocaleStore } from "../../stores/LocaleStore";


const ID_PREFIX = "browserMissionList.";

@observer
export class BrowserMissionList extends React.Component<any, {}> {

  @Inject browserStore: BrowserStore;
  @Inject userStore: UserStore;
  @Inject workerService: WorkerService;
  @Inject localeStore: LocaleStore;


  render() {
    if (this.browserStore.loading) {
      return <Spin size="large"/>;
    }
    else {
      return <QueueAnim type={['right', 'left']} leaveReverse>
          <div>
            <Divider>
              <LocaleMessage id={ID_PREFIX + "dividerText"}/>
            </Divider>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={this.browserStore.listData}
              renderItem={item => <MissionItem key={item.missionId} item={item}/>}
            />
            <div style={{textAlign: 'center'}}>
              <Pagination defaultCurrent={1} total={1}/>
            </div>
          </div>
      </QueueAnim>
    }
  }

}
