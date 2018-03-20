import { Mission, MissionState } from "../Mission";

export class MissionRequesterQueryItem {
  title: string;
  description: string;
  mission: Mission;
  state: MissionState;
  coverUrl: string; //封面url

  constructor(params: Partial<MissionRequesterQueryItem>) {
    Object.assign(this,params);
  }
}


export class MissionRequesterQueryDetailItem extends MissionRequesterQueryItem {
  imageUrls: string[];

  constructor(params: Partial<MissionRequesterQueryDetailItem>) {
    super(params);
  }
}
