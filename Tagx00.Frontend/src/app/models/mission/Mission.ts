export enum MissionType {
  IMAGE = "IMAGE"
}

export enum MissionState {
  PENDING,
  ACTIVE,
  ENDED

}

export class Mission {
  dataType: MissionType;
}
