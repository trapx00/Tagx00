
export interface InstancesAcceptedPerDate {
  date: string;
  num: number;
}

export interface AdminInfo {
  activeMissionCount: number;
  endedMissionCount: number;
  pendingMissionCount: number;
  userCount: number;
  totalMissionCount: number;
  totalInstanceCount: number;
  inProgressInstanceCount: number;
  submittedInstanceCount: number;
  finalizeInstanceCount: number;
  listOfInstanceDateNum: InstancesAcceptedPerDate[];
}
