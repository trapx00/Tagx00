import { Injectable } from "react.di";
import { Instance } from "../../models/instance/Instance";
import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { ImageInstanceDetail } from "../../models/instance/image/ImageInstanceDetail";
import { InstanceDetail } from "../../models/instance/InstanceDetail";
import { Response } from "../../models/Response";
import { WorkerService } from "../WorkerService";

@Injectable
export class WorkerServiceMock extends WorkerService {

  async getAllInstances(token: string): Promise<Instance[]> {
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
        completedJobsCount: x * 2,
        missionInstanceState: x % 2 === 0
          ? MissionInstanceState.SUBMITTED
          : MissionInstanceState.IN_PROGRESS,
      })
    );

  }

  async getInstanceDetail(missionId: number, token: string): Promise<ImageInstanceDetail> {

    // mock
    return {
      imageResults: [],
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
          completedJobsCount: 0,
          missionInstanceState: MissionInstanceState.IN_PROGRESS,
        }

    } as ImageInstanceDetail;
  }

  async saveProgress(missionId: number, detail: InstanceDetail, token: string): Promise<boolean> {
    return true;
  }

  async submit(missionId: number, detail: InstanceDetail, token: string): Promise<boolean> {
    return true;
  }

  async acceptMission(missionId: number, token: string): Promise<Response> {
    return {
      infoCode: 10000,
      description: "success"
    };
  }
}
