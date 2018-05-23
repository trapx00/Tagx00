import React from "react";
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { TopicService } from "../../../api/TopicService";
import { LocaleMessage } from "../../../internationalization/components/index";
import { Tag, Button, Popover, Input } from "antd";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";
import { requireLogin } from "../../hoc/RequireLogin";
import { UserRole } from "../../../models/user/User";

interface State {
  key: number;
  input: string;
}

@requireLogin(UserRole.ROLE_ADMIN)
export default class TopicsManagementPage extends React.Component<any,State> {
  @Inject userStore: UserStore;
  @Inject topicService: TopicService;

  state = {
    key: 0,
    input: ""
  };

  handleClose = async(topicId) => {
    await this.topicService.deleteTopics({ topicIds: [topicId]});
    this.setState({ key: this.state.key+1});

  }

  onTagValueChange = (e) => {
    this.setState({input: e.target.value});
  }

  handleAdd = async() => {
    await this.topicService.addTopics({topics: [this.state.input]});
    this.setState({ input: "", key: this.state.key+1});
  }

  renderTopics = async() => {
    const topics = await this.topicService.getAllTopics();
    return <div>{topics.topics.map(tag =>
      <Tag key={tag.topicId} closable={true} afterClose={() => this.handleClose(tag.topicId)}>
        {tag.value}
      </Tag>
    )}
    </div>

  }

  render() {
       return <div>
        <h1>
          <LocaleMessage id={"selfCenter.manageTopics"}/>
        </h1>
        <br/>
         <Input style={{marginBottom:20,width:150}} size="small" placeholder="添加标签" onChange={this.onTagValueChange}
                value={this.state.input} onPressEnter={this.handleAdd}/>
        <AsyncComponent key={this.state.key} render={this.renderTopics} componentWhenLoading={<Loading/>}/>

      </div>;
  }
}
