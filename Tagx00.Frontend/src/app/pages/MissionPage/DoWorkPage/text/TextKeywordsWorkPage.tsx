import React from 'react';
import { TextNotation, TextWorkPageProps, TextWorkPageState } from "./shared";
import { TextKeywordsJob } from "../../../../models/instance/text/job/TextKeywordsJob";
import { TagDescriptionTuple, TagTuple } from "../../../../models/instance/TagTuple";
import { toJS } from "mobx";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { TextMissionKeywordsSetting, TextMissionType } from "../../../../models/mission/text/TextMissionProperties";
import { WorkPageLayout } from "../WorkPageLayout";
import { MissionTipCard } from "../../../../components/Mission/MissionTipCard";
import { ProgressController } from "../../../../components/Mission/WorkPageSuite/ProgressController";
import { MissionType } from "../../../../models/mission/Mission";
import { TextReader } from "../../../../components/Mission/WorkPageSuite/TextReader";
import { TextMissionTipCard } from "../../../../components/Mission/MissionTipCard/TextMissionTipCard";
import { TagPanel } from "../../../../components/Mission/WorkPageSuite/TagDescriptionPanel/TagPanel";

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
      this.state.notation.job.tagTuples = this.state.notation.job.tagTuples.concat({
        tag: word,
        descriptions: []
      });
      this.forceUpdate();
    }else {
      // remove the tag
      this.state.notation.job.tagTuples = this.state.notation.job.tagTuples.filter(x => x.tag !== word);
      this.forceUpdate();
    }
  };

  render() {

    const { missionDetail, controllerProps } = this.props;
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
        <TagPanel tagTuples={this.state.notation.job.tagTuples}
                  onChange={this.onTagChange}
                  readonly={this.props.readonlyMode}
                  allowCustomTag={true}
                  tags={this.props.notation.setting.keywords}
        />

      </>
      <>
        <ProgressController {...controllerProps}
                            goNext={this.goNext}
                            readonlyMode={this.props.readonlyMode}
                            saveProgress={this.saveProgress}
        />
      </>
    </WorkPageLayout>
  }
}
