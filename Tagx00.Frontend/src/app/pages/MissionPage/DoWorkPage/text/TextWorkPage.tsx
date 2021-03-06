import React from 'react';
import { InstanceDetail } from "../../../../models/instance/InstanceDetail";
import { MissionDetail } from "../../../../models/mission/MissionDetail";
import { TextInstanceDetail } from "../../../../models/instance/text/TextInstanceDetail";
import { TextMissionDetail } from "../../../../models/mission/text/TextMissionDetail";
import { Inject } from "react.di";
import { WorkerService } from "../../../../api/WorkerService";
import { TextWorkPageController } from "./TextWorkPageController";
import { RootWorkPageProps, WorkPage, WorkPageProps } from "../WorkPage";
import { TextJob } from "../../../../models/instance/text/job/TextJob";
import {
  TextMissionClassificationSetting,
  TextMissionKeywordsSetting, TextMissionSetting,
  TextMissionType
} from "../../../../models/mission/text/TextMissionProperties";
import { TextKeywordsWorkPage } from "./TextKeywordsWorkPage";
import { TextClassificationWorkPage } from "./TextClassificationWorkPage";
import { TextNotation } from "./shared";
import { observer } from "mobx-react";
import { toJS } from "mobx";

interface Props extends RootWorkPageProps<TextMissionDetail, TextInstanceDetail>{

}

export class TextWorkPage extends React.Component<Props, {}> {

  controller: TextWorkPageController = new TextWorkPageController(this.props.missionDetail, this.props.instanceDetail);

  chooseWorkPage = (context: WorkPageProps<TextMissionDetail, TextJob, TextNotation<TextJob, TextMissionSetting>>) => {
    console.log(toJS(context));
    switch (context.notation.setting.textMissionType) {
      case TextMissionType.KEYWORDS:
        return <TextKeywordsWorkPage {...context as any}/>;
      case TextMissionType.CLASSIFICATION:
        return <TextClassificationWorkPage {...context as any}
        />
    }
  };

  render() {
    console.log("rerender");
    return <WorkPage readonlyMode={this.props.readonlyMode}
                     chooseWorkPage={this.chooseWorkPage}
                     controller={this.controller}
                     jumpBack={this.props.jumpBack}

    />
  }
}
