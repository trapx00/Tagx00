import React from 'react';
import { TextClassificationJob } from "../../../../models/instance/text/job/TextClassificationJob";
import { TextNotation } from "./TextWorkPageController";
import { TextWorkPageProps, TextWorkPageState } from "./shared";
import {
  TextMissionClassificationSetting,
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

interface Props extends TextWorkPageProps<TextClassificationJob>{
  setting: TextMissionClassificationSetting;
}

function initializeNotation(notation: TextNotation<TextClassificationJob>) {
  if (!(notation.job && notation.job.tagTuples)) {
    notation.job = {
      type: TextMissionType.CLASSIFICATION,
      tagTuples: []
    };
  }
  return notation;
}


export class TextClassificationWorkPage extends React.Component<Props, TextWorkPageState<TextClassificationJob>> {
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
    console.log(this.props.setting.classes);
    return <WorkPageLayout >
      <>
        <TextReader url={this.state.notation.textUrl}/>
      </>
      <>
        <TextMissionTipCard
          setting={this.props.setting}
          title={missionDetail.publicItem.title}

        />
        <TagPanel tagTuples={job.tagTuples}
                  onChange={this.onTagChange}
                  readonly={this.props.readonlyMode}
                  allowedTags={this.props.setting.classes}
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