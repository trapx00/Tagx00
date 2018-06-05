import { TextJob } from "../../../../models/instance/text/job/TextJob";
import { WorkPageProps, WorkPageState } from "../WorkPage";
import { TextMissionDetail } from "../../../../models/mission/text/TextMissionDetail";
import { TextMissionSetting } from "../../../../models/mission/text/TextMissionProperties";
import { Notation } from "../WorkPageController";

export interface TextNotation<T extends TextJob, S extends TextMissionSetting> extends Notation<T> {
  textToken: string;
  setting: S;
  job: T;
}

export interface TextWorkPageProps<T extends TextJob, S extends TextMissionSetting> extends WorkPageProps<TextMissionDetail, T, TextNotation<T, S>> {

}

export interface TextWorkPageState<T extends TextJob, S extends TextMissionSetting> extends WorkPageState<T, TextNotation<T, S>> {

}
