import { VideoMissionDetail } from "../../../../../models/mission/video/VideoMission";
import { VideoJob } from "../../../../../models/instance/video/job/VideoJob";
import { WorkPageProps, WorkPageState } from "../../WorkPage";
import { Notation } from "../../WorkPageController";


export interface VideoNotation<T extends VideoJob= VideoJob> extends Notation<T> {
  videoUrl: string;

}
export interface VideoWorkPageProps<T extends VideoJob> extends WorkPageProps<VideoMissionDetail, T, VideoNotation<T>> {

}

export interface VideoWorkPageState<T extends VideoJob> extends WorkPageState<T, VideoNotation<T>>{

}
