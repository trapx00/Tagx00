import * as React from "react";
import { Tag, Icon, List, Button, Divider } from "antd";
import { Localize } from "../../../internationalization/components/index";
import { STORE_BROWSER } from "../BrowserStore";
import { inject } from "mobx-react";
import { observable } from "mobx";


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
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
      <Tag color="geekblue" style={smallerDiv}>主题词</Tag>
    </div>
  )
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    description: tags,
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
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

@inject(STORE_BROWSER)
@observable
export class BrowserMissionList extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Divider/>
        <List
          itemLayout="vertical"
          size="large"
          pagination={pagination}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<Button type="primary">领取</Button>, <IconText type="like-o" text="156"/>,
                <IconText type="message" text="2"/>]}
              extra={<img width={272} alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>)
  }
}