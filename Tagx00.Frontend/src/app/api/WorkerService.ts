import { BaseService } from "./BaseService";
import { Instance } from "../models/instance/Instance";
import { ImageMissionDetail, ImageMissionType } from "../models/mission/ImageMission";
import { MissionInstanceState } from "../models/instance/MissionInstanceState";
import { MissionState } from "../models/mission/Mission";
import { waitForMs } from "../../utils/Wait";
import { InstanceDetail } from "../models/instance/InstanceDetail";
import { imgs } from "./MissionService";
import { ImageInstanceDetail } from "../models/instance/image/ImageInstanceDetail";

export class WorkerService extends BaseService {

  constructor() {
    super("mission/worker");
  }

  async getAllInstances(): Promise<Instance[]> {
    //mock
    return [1, 2, 3, 4, 5].map(x =>
      ({
        instanceId: x,
        workerUsername: "123",
        title: `Title${x}`,
        description: `Description `.repeat(x),
        missionId: 123,
        acceptDate: new Date(),
        submitDate: x % 2 === 0 ? new Date() : null,
        isSubmitted: x % 2 === 0,
        completedJobCount: x * 2,
        missionInstanceState: x % 2 === 0
          ? MissionInstanceState.SUBMITTED
          : MissionInstanceState.IN_PROGRESS,
      })
    );

    // const res = await this.fetch({
    //   token: this.token
    // });
    //
    // return res.response.instances as Instance[];

  }

  async getInstanceDetail(missionId: number, token: string) {

    // mock
    return {
      results: [],
      instance:
        {
          instanceId: 1,
          workerUsername: "123",
          title: `Title`,
          description: `Description `,
          missionId: 123,
          acceptDate: new Date(),
          submitDate: null,
          isSubmitted: false,
          completedJobCount: 0,
          missionInstanceState: MissionInstanceState.IN_PROGRESS,
        }

    } as ImageInstanceDetail;

    // const res = await this.fetch({
    //   token: token,
    //   route: missionId + "",
    // });
    //
    // return res.response.detail as T;
  }


}

export const workerService = new WorkerService();
