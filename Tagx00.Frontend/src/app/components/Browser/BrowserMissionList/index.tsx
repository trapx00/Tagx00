import * as React from "react";
import { Tag, Spin, List, Button, Divider, Pagination } from "antd";
import { Localize } from "../../../internationalization/components/index";
import { STORE_BROWSER } from "../BrowserStore";
import { inject, observer } from "mobx-react";

const centerDivider = {
  marginTop: '-10%',
  marginBottom: '10%'
};

const smallerDiv = {
  display: 'inline',
};

/*const listData = [];
for (let i = 0; i < 5; i++) {
  const tags = (
    <div>
      <Tag color="#108ee9" style={smallerDiv}>任务类型</Tag>
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
    </div>
  );
  listData.push({
    missionId: 0,
    coverUrl: 'http://ant.design',
    title: `ant design part ${i}`,
    tags: tags,
    startDate: "123",
    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  });
}*/

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
                                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
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