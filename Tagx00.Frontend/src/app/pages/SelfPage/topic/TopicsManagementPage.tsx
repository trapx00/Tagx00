import React from "react";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { TopicService } from "../../../api/TopicService";
import { LocaleMessage } from "../../../internationalization/components/index";
import { TopicDelete } from "../../../models/topic/TopicDelete";
import { Tag, Button, Popover, Input } from "antd";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { action, observable } from "mobx";
import { TopicSaveVo } from "./TopicSaveVo";
import { TopicDeleteVo } from "./TopicDeleteVo";

export class TopicsManagementPage extends React.Component<any,any> {
  @observable delete: TopicDeleteVo = new TopicDeleteVo();
  @observable save: TopicSaveVo = new TopicSaveVo();
  @Inject userStore: UserStore;
  @Inject topicService: TopicService;

  constructor(props) {
    super(props);
    this.state = {
      tags: [{topicId:null,value:null}]
    }
  }


  handleClose = async(topicId) => {
    [...this.state.tags].filter(tag => (tag.topicId !== topicId) && tag);
    this.delete.topicIds = topicId;
    await this.topicService.deleteTopics(this.delete.topicDelete,this.userStore.token);
    this.renderTopics();
  }

  @action onTagValueChange = (e) => {
    this.save.value = e.target.value;
  }

  handleAdd = async() => {
    const tags = [...this.state.tags];
    this.save.topicId = tags.length + 1;
    await this.topicService.addTopics(this.save.topicSave,this.userStore.token);
    this.renderTopics();
  }


  renderTopics = async() => {
    const topics = await this.topicService.getAllTopics();
    this.setState({tags: topics.topics});
    const content = (
      <div>
        <Input size="small" placeholder="标签" onChange={this.onTagValueChange} onPressEnter={this.handleAdd}/>
      </div>
    );
    return <div>{this.state.tags.map(tag =>
      <Tag key={tag.topicId} closable={true} afterClose={() => this.handleClose(tag.topicId)}>
        {tag.value}
      </Tag>
    )}
      <Popover content={content} title={"添加"} trigger="click">
        <Button size="small" type="dashed">+ 添加标签</Button>
      </Popover>
    </div>
  }

  render() {
       return <div>
        <h1>
          <LocaleMessage id={"selfCenter.manageTopics"}/>
        </h1>
        <br/>
        <p>现有主题</p>
        <br/>
        <AsyncComponent render={this.renderTopics}/>
      </div>;
  }
}