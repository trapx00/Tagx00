import React from 'react';
import { TextClassificationJob } from "../../../../models/instance/text/job/TextClassificationJob";
import { TextNotation, TextWorkPageProps, TextWorkPageState } from "./shared";
import {
  TextMissionClassificationSetting,
  TextMissionType
} from "../../../../models/mission/text/TextMissionProperties";
import { TagTuple } from "../../../../models/instance/TagTuple";
import { toJS } from "mobx";
import { WorkPageLayout } from "../WorkPageLayout";
import { ProgressController } from "../../../../components/Mission/WorkPageSuite/ProgressController";
import { TextReader } from "../../../../components/Mission/WorkPageSuite/TextReader";
import { TextMissionTipCard } from "../../../../components/Mission/MissionTipCard/TextMissionTipCard";
import { TagPanel } from "../../../../components/Mission/WorkPageSuite/TagDescriptionPanel/TagPanel";
import { message } from 'antd';
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { observer } from "mobx-react";

interface Props extends TextWorkPageProps<TextClassificationJob, TextMissionClassificationSetting>{

}


function initializeNotation(notation: TextNotation<TextClassificationJob, TextMissionClassificationSetting>) {
  if (!(notation.job && notation.job.tagTuples)) {
    notation.job = {
      type: TextMissionType.CLASSIFICATION,
      tagTuples: []
    };
  }
  return notation;
}

export class TextClassificationWorkPage extends React.Component<Props, TextWorkPageState<TextClassificationJob, TextMissionClassificationSetting>> {

  @Inject localeStore: LocaleStore;

  state = {
    notation: initializeNotation(this.props.notation),
    selectedIndex: -1,
    addingMode: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notation !== prevState.notation) {
      return {
        notation: initializeNotation(nextProps.notation),
      }
    } else {
      return null;
    }
  }


  goNext = () => {
    this.props.goNext(this.state.notation);
  };

  onTagChange = (tags: TagTuple[]) => {
    this.state.notation.job.tagTuples = tags;
    this.forceUpdate();
  };

  saveProgress = () => {
    console.log(toJS(this.state.notation));
    this.props.submit(this.state.notation);
  };

  onTagClicked = (word: string) => {
    if (this.props.readonlyMode) {
      return;
    }

    const tuples = this.state.notation.job.tagTuples;
    if (!tuples.find(x => x.tag === word)){
      // not allow custom tag
      if (this.state.notation.setting.classes.indexOf(word) >=0) {
        this.state.notation.job.tagTuples = this.state.notation.job.tagTuples.concat({
          tag: word,
          descriptions: []
        });
        this.forceUpdate();
      } else {
        message.warning(
          this.localeStore.get("drawingPad.textReader.notAllowed")
        );
      }

    } else {
      // remove the tag
      this.state.notation.job.tagTuples = this.state.notation.job.tagTuples.filter(x => x.tag !== word);
      this.forceUpdate();
    }
  };


  render() {

    const { job } = this.state.notation;
    const { missionDetail, controllerProps } = this.props;
    // console.log(this.props.setting.classes);
    return <WorkPageLayout
      next={this.goNext}
      previous={this.props.controllerProps.goPrevious}
      saveProgress={this.saveProgress}

    >
      <>
        <TextReader textToken={this.state.notation.textToken}
                    missionId={missionDetail.publicItem.missionId}
                    onTagClicked={this.onTagClicked}
                    selectedTags={this.state.notation.job.tagTuples.map(x => x.tag)}
        />
      </>
      <>
        <TextMissionTipCard
          setting={this.props.notation.setting}
          title={missionDetail.publicItem.title}

        />
        <TagPanel tagTuples={job.tagTuples}
                  onChange={this.onTagChange}
                  readonly={this.props.readonlyMode}
                  allowCustomTag={false}
                  tags={this.state.notation.setting.classes}
        />
      </>
      <>
        <ProgressController {...this.props.controllerProps}
                            goNext={this.goNext}
                            readonlyMode={this.props.readonlyMode}
                            saveProgress={this.saveProgress}
        />
      </>
    </WorkPageLayout>
  }
}
