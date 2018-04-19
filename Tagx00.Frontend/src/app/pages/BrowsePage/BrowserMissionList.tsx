import React from "react";
import { Button, Divider, List, message, Pagination, Spin } from "antd";
import { LocaleMessage, Localize } from "../../internationalization/components";
import { BrowserStore } from "../../stores/BrowserStore";
import { observer } from "mobx-react";
import { Response } from "../../models/response/Response";
import { WorkerService } from "../../api/WorkerService";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { MissionItem } from "./MissionItem";
import { LocaleStore } from "../../stores/LocaleStore";

const centerDivider = {
  marginTop: '-10%',
};

const ID_PREFIX = "browserMissionList.";

@observer
export class BrowserMissionList extends React.Component<any, {}> {

  @Inject browserStore: BrowserStore;
  @Inject userStore: UserStore;
  @Inject workerService: WorkerService;
  @Inject localeStore: LocaleStore;

  render() {
    if (this.browserStore.isBrowsing) {
      if (this.browserStore.listData.length == 0) {
        return <div style={{textAlign: 'center', marginTop: '-10%'}}><Spin size="large"/></div>;
      }
      else {
        return <div>
          <Divider style={centerDivider}><LocaleMessage id={ID_PREFIX + "dividerText"}/></Divider>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            dataSource={this.browserStore.listData}
            renderItem={item => <MissionItem key={item.missionId} item={item}/>}
          />
          <div style={{textAlign: 'center'}}>
            <Pagination defaultCurrent={1} total={1}/>
          </div>
        </div>;

      }
    } else {
      return null;
    }
  }
}
