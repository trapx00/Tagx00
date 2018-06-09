import { ImageJob } from "../../../../../models/instance/image/job/ImageJob";
import { MissionAsset } from "../../../../../models/mission/MissionAsset";
import { Notation } from "../../WorkPageController";
import { AudioJob } from "../../../../../models/instance/audio/job/AudioJob";
import { ImageNotation } from "../../image/shared";
import { ImageMissionDetail } from "../../../../../models/mission/image/ImageMission";
import { WorkPageProps, WorkPageState } from "../../WorkPage";
import { AudioMissionDetail } from "../../../../../models/mission/audio/AudioMission";

export interface AudioNotation<T extends AudioJob = AudioJob> extends Notation<T> {
  audioUrl: string;

}
export interface AudioWorkPageProps<T extends AudioJob> extends WorkPageProps<AudioMissionDetail, T, AudioNotation<T>> {

}

export interface AudioWorkPageState<T extends AudioJob> extends WorkPageState<T, AudioNotation<T>>{

}
