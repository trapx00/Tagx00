import React from 'react';
import { Loading } from "../../../../../components/Common/Loading";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { TagSelector } from "../../../../../components/TagSelector";
import { TopicService } from "../../../../../api/TopicService";
import { LocaleMessage } from "../../../../../internationalization/components";
import { Checkbox} from 'antd';

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

interface State {
  loading: boolean;
  availableTags: string[];
}

const ID_PREFIX = "missions.createMission.";

export class TopicSelector extends React.Component<Props, State> {

  state = {
    loading: true,
    availableTags: null
  };

  componentDidMount() {
    this.topicService.getAllTopics().then(tags => {
      this.setState({
        loading: false,
        availableTags: tags.topics.map(x=>x.value)
      })
    });
  }

  @Inject localeStore: LocaleStore;
  @Inject topicService: TopicService;

  onTopicChange = (tags: string[]) => {
    this.props.onChange(tags);
  };

  render() {

    const locale: any = new Proxy({}, {
      get: (target, key) => {
        return this.localeStore.get(`${ID_PREFIX}fields.${key}`) as string;
      }
    });
    if (this.state.loading) {
      return <Loading/>;
    }

    return <div>
      <LocaleMessage id={ID_PREFIX+"fields.topics"}/>
      <TagSelector onSelectedChanged={this.onTopicChange}
                   selectedTags={this.props.selected}
                   availableTags={this.state.availableTags}
                   allowCustomTag={false}
                   placeholder={locale.topics}
                   
      />
    </div>;
  }
}
