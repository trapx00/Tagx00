import React from "react";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { TopicService } from "../../api/TopicService";
import { LocaleMessage } from "../../internationalization/components/index";
import { TopicFetchResponse } from "../../models/topic/response/TopicFetchResponse";
import { TopicSave } from "../../models/topic/TopicSave";

interface Props {
  topics: TopicSave
}
export class TopicsManagementPage extends React.Component<{},{}> {
  @Inject userStore: UserStore;
  @Inject topicService: TopicService;

  getTopics = async() => {
    const topics = await this.topicService.getAllTopics();
    return <div>

    </div>
  }

  deleteTopics = async () => {
    const topicsId = this.props.children;
   // await this.topicService.deleteTopics(missionId, this.userStore.token);
  };

  savaTopics = async () => {
    const topics = this.props;
   // await this.topicService.addTopics(this.userStore.token);
  };

  render() {
    return <div>
        <h1>
          <LocaleMessage id={"selfCenter.manageTopics"}/>
        </h1>
      </div>;
  }
}