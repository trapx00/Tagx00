import React from 'react';
import { TextNotation, TextWorkPageProps, TextWorkPageState } from "./shared";
import { TextKeywordsJob } from "../../../../models/instance/text/job/TextKeywordsJob";
import { TagDescriptionTuple, TagTuple } from "../../../../models/instance/TagTuple";
import { toJS } from "mobx";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { TextMissionKeywordsSetting, TextMissionType } from "../../../../models/mission/text/TextMissionProperties";
import { WorkPageLayout } from "../WorkPageLayout";
import { MissionTipCard } from "../../../../components/Mission/MissionTipCard";
import { TagDescriptionTuplePanel } from "../../../../components/ImageWork/TagDescriptionPanel";
import { ProgressController } from "../../../../components/ImageWork/ProgressController";
import { TagPanel } from "../../../../components/ImageWork/TagDescriptionPanel/TagPanel";
import { MissionType } from "../../../../models/mission/Mission";
import { TextReader } from "./TextReader";
import { TextMissionTipCard } from "../../../../components/Mission/MissionTipCard/TextMissionTipCard";

interface Props extends TextWorkPageProps<TextKeywordsJob, TextMissionKeywordsSetting>{

}

function initializeNotation(notation: TextNotation<TextKeywordsJob, TextMissionKeywordsSetting>) {
  if (!(notation.job && notation.job.tagTuples)) {
    notation.job = {
      type: TextMissionType.KEYWORDS,
      tagTuples: []
    };
  }
  return notation;
}



export class TextKeywordsWorkPage extends React.Component<Props, TextWorkPageState<TextKeywordsJob, TextMissionKeywordsSetting>> {
  state = {
    notation: initializeNotation(this.props.notation),
    selectedIndex: -1,
    addingMode: false,

  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notation !== prevState.notation) {
      return {
        notation: initializeNotation(nextProps.notation)
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
                  allowCustomTag={true}
                  tagConfTuples={this.props.notation.setting.keywords.map(x => ({tag: x, confidence: 1}))}
        />
        <ProgressController {...controllerProps}
                            goNext={this.goNext}
                            readonlyMode={this.props.readonlyMode}
                            saveProgress={this.submit}
        />
      </>
    </WorkPageLayout>
  }
}
