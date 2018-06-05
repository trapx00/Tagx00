import React from 'react';
import { TextClassificationJob } from "../../../../models/instance/text/job/TextClassificationJob";
import { TextNotation, TextWorkPageProps, TextWorkPageState } from "./shared";
import {
  TextMissionClassificationSetting, TextMissionKeywordsSetting,
  TextMissionType
} from "../../../../models/mission/text/TextMissionProperties";
import { TagTuple } from "../../../../models/instance/TagTuple";
import { MissionType } from "../../../../models/mission/Mission";
import { toJS } from "mobx";
import { WorkPageLayout } from "../WorkPageLayout";
import { MissionTipCard } from "../../../../components/Mission/MissionTipCard";
import { TagPanel } from "../../../../components/ImageWork/TagDescriptionPanel/TagPanel";
import { ProgressController } from "../../../../components/ImageWork/ProgressController";
import { TextReader } from "./TextReader";
import { TextMissionTipCard } from "../../../../components/Mission/MissionTipCard/TextMissionTipCard";
import { TextKeywordsJob } from "../../../../models/instance/text/job/TextKeywordsJob";

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

  submit = () => {
    console.log(toJS(this.state.notation));
    this.props.submit(this.state.notation);
  };


  render() {

    const { job } = this.state.notation;
    const { missionDetail, controllerProps } = this.props;
    // console.log(this.props.setting.classes);
    return <WorkPageLayout >
      <>
        <TextReader textToken={this.state.notation.textToken}/>
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
                  tagConfTuples={this.props.notation.setting.classes.map(x=>({tag: x, confidence: 1}))}
        />
        <ProgressController {...this.props.controllerProps}
                            goNext={this.goNext}
                            readonlyMode={this.props.readonlyMode}
                            saveProgress={this.submit}
        />
      </>
    </WorkPageLayout>
  }
}
