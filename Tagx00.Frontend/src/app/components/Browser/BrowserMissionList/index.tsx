import * as React from "react";
import { Tag, Spin, List, Button, Divider, Pagination } from "antd";
import { Localize } from "../../../internationalization/components/index";
import { STORE_BROWSER } from "../BrowserStore";
import { inject, observer } from "mobx-react";

const centerDivider = {
  marginTop: '-10%',
  marginBottom: '10%'
};

@inject(STORE_BROWSER)
@observer
export class BrowserMissionList extends React.Component<any, any> {
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
                      actions={[<Button type="primary" ghost={true} size="small" icon="check"/>,
                        <Button size="small" shape="circle" icon="ellipsis"/>]}
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