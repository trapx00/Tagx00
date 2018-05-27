import { TextJob } from "../../../../models/instance/text/job/TextJob";
import { WorkPageProps, WorkPageState } from "../WorkPage";
import { TextMissionDetail } from "../../../../models/mission/text/TextMissionDetail";
import { TextNotation } from "./TextWorkPageController";

export interface TextWorkPageProps<T extends TextJob> extends WorkPageProps<TextMissionDetail, T, TextNotation<T>> {

}

export interface TextWorkPageState<T extends TextJob> extends WorkPageState<T, TextNotation<T>> {

}
