import * as React from "react";
import { message, Spin, List, Button, Divider, Pagination } from "antd";
import { Localize } from "../../../internationalization/components/index";
import { BrowserProps, STORE_BROWSER } from "../BrowserStore";
import { inject, observer } from "mobx-react";
import { workerService } from "../../../api/WorkerService";
import { STORE_USER } from "../../../constants/stores";
import { UserStoreProps } from "../../../stores/UserStore";

const centerDivider = {
  marginTop: '-10%',
  marginBottom: '10%'
};

const HasIdButton: any = Button;

interface Props extends BrowserProps, UserStoreProps {

}

@inject(STORE_BROWSER, STORE_USER)
@observer
export class BrowserMissionList extends React.Component<Props, any> {
  handleAccept = async (e) => {
    const res = await workerService.acceptMission(e.target.id, "");

    if (res.infoCode === 10000) {
      message.success('任务接受成功');
    }
  };

  render() {
    if (this.props[STORE_BROWSER].isBrowsing) {
      if (this.props[STORE_BROWSER].listData.length == 0) {
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
                  dataSource={this.props[STORE_BROWSER].listData}
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
