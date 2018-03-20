import { Mission, MissionState } from "../Mission";

export class MissionRequesterQueryItem {
  title: string;
  description: string;
  mission: Mission;
  state: MissionState;
  coverUrl: string; //封面url
}

export class MissionRequesterQueryDetailItem extends MissionRequesterQueryItem {
  imageUrls: string[];
}
