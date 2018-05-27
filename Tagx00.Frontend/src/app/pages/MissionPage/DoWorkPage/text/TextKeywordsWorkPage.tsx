import React from 'react';
import { TextWorkPageProps, TextWorkPageState } from "./shared";
import { TextKeywordsJob } from "../../../../models/instance/text/job/TextKeywordsJob";
import { TagDescriptionTuple, TagTuple } from "../../../../models/instance/TagTuple";
import { toJS } from "mobx";
import { TextNotation } from "./TextWorkPageController";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { TextMissionKeywordsSettings, TextMissionType } from "../../../../models/mission/text/TextMissionProperties";
import { WorkPageLayout } from "../WorkPageLayout";
import { MissionTipCard } from "../../../../components/Mission/MissionTipCard";
import { TagDescriptionTuplePanel } from "../../../../components/ImageWork/TagDescriptionPanel";
import { ProgressController } from "../../../../components/ImageWork/ProgressController";
import { TagPanel } from "../../../../components/ImageWork/TagDescriptionPanel/TagPanel";
import { MissionType } from "../../../../models/mission/Mission";
import { TextReader } from "./TextReader";
import { TextMissionTipCard } from "../../../../components/Mission/MissionTipCard/TextMissionTipCard";

interface Props extends TextWorkPageProps<TextKeywordsJob>{
  setting: TextMissionKeywordsSettings;
}

function initializeNotation(notation: TextNotation<TextKeywordsJob>) {
  if (!(notation.job && notation.job.tagTuples)) {
    notation.job = {
      type: TextMissionType.KEYWORDS,
      tagTuples: []
    };
  }
  return notation;
}



export class TextKeywordsWorkPage extends React.Component<Props, TextWorkPageState<TextKeywordsJob>> {
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
    return <WorkPageLayout >
      <>
       <TextReader textUrl={this.state.notation.textUrl}/>
      </>
      <>
        <TextMissionTipCard
                        setting={this.props.setting}
                        title={missionDetail.publicItem.title}
        />
        <TagPanel tagTuples={job.tagTuples}
                  onChange={this.onTagChange}
                  readonly={this.props.readonlyMode}
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
