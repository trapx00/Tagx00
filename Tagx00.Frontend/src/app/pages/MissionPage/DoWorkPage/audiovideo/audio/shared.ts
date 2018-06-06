import { ImageJob } from "../../../../../models/instance/image/job/ImageJob";
import { MissionAsset } from "../../../../../models/mission/MissionAsset";
import { Notation } from "../../WorkPageController";
import { AudioJob } from "../../../../../models/instance/audio/job/AudioJob";

export interface AudioNotation<T extends AudioJob = AudioJob> extends Notation<T> {
  audioUrl: string;
}
