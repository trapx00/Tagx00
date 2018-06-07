///<reference path="../../../../models/instance/3d/job/3dJob.ts"/>
import { Notation } from "../WorkPageController";
import { ThreeDimensionJob } from "../../../../models/instance/3d/job/3dJob";
import { WorkPageProps, WorkPageState } from "../WorkPage";
import { ThreeDimensionMissionDetail } from "../../../../models/mission/3d/3dMission";
import { ThreeDimensionModelUrl } from "../../../../models/mission/3d/3dModelUrl";

export interface ThreeDimensionNotation<T extends ThreeDimensionJob = ThreeDimensionJob> extends Notation<T> {
  url: ThreeDimensionModelUrl;

}
export interface ThreeDimensionWorkPageProps<T extends ThreeDimensionJob> extends WorkPageProps<ThreeDimensionMissionDetail, T, ThreeDimensionNotation<T>> {

}

export interface ThreeDimensionWorkPageState<T extends ThreeDimensionJob> extends WorkPageState<T, ThreeDimensionNotation<T>>{

}
