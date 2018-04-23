import React from "react";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { TopicService } from "../../../api/TopicService";
import { LocaleMessage } from "../../../internationalization/components/index";
import { TopicFetchResponse } from "../../../models/topic/response/TopicFetchResponse";
import { TopicSave } from "../../../models/topic/TopicSave";
import { TopicDelete } from "../../../models/topic/TopicDelete";
import {Tag, Button} from "antd";
import { Topic } from "../../../models/topic/Topic";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { DefinitionItem } from "../../../components/DefinitionItem/index";

export class TopicsManagementPage extends React.Component<any,any> {
  @Inject userStore: UserStore;
  @Inject topicService: TopicService;

  constructor(props) {
    super(props);
    this.state = {
      tags: null
    }
  }

  handleClose = async(topicId) => {
    const tags = [...this.state.tags].filter(tag => (tag.topicId !== topicId) && tag);
    //const res = await this.topicService.deleteTopics(new TopicDelete({topicsId:key}),this.userStore.token);
    this.setState({ tags });
  }

  addTag() {
    const tag = this.state.tags;
    const topicId = tag.length + 1;
    tag.push({ topicId: topicId, value: `新标签${topicId}` });
    this.setState({tags:tag});
  }

  renderTopics = async() => {
    const topics = await this.topicService.getAllTopics();
    this.setState({tags: topics.topics});
    return <div>{this.state.tags.map(tag =>
      <Tag key={tag.topicId} closable={tag.topicId !== 1} afterClose={() => this.handleClose(tag.topicId)}>
        {tag.value}
      </Tag>
    )}
      <Button size="small" type="dashed" onClick={this.addTag}>
        + 添加标签
      </Button>
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