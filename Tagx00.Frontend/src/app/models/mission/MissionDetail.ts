import { MissionState } from "./Mission";
import { MissionPublicItem } from "./MissionPublicItem";

export interface MissionDetail<T extends MissionPublicItem = MissionPublicItem> {
  publicItem: T;
  missionState: MissionState;
}
