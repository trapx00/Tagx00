import * as React from "react";
import { Tag, Icon, List, Button, Divider, Pagination } from "antd";
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

const handleClick = (e) => {
  this.setState({
    searchValue: e.target.innerHTML
  });
  this.handleSearch();
};

const listData = [];
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
    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  });
}

const pagination = {
  pageSize: 10,
  current: 1,
  total: listData.length,
  onChange: (() => {
  }),
};

const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
);

export class BrowserMissionList extends React.Component<any, any> {
  render() {
    return (
      <Localize replacements={{dividerText: "browserMissionList.dividerText"}}>{
        (props) => {
          return <div>
            <Divider style={centerDivider}>{props.dividerText}</Divider>
            <List
              itemLayout="vertical"
              size="large"
              pagination={false}
              dataSource={listData}
              renderItem={item => (
                <List.Item
                  key={item.title}
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
}