import { BaseService } from "./BaseService";
import { Instance } from "../models/instance/Instance";
import { ImageMissionDetail, ImageMissionType } from "../models/mission/ImageMission";
import { MissionInstanceState } from "../models/instance/MissionInstanceState";
import { MissionState } from "../models/mission/Mission";
import { waitForMs } from "../../utils/Wait";
import { InstanceDetail } from "../models/instance/InstanceDetail";
import { imgs } from "./MissionService";
import { ImageInstanceDetail } from "../models/instance/image/ImageInstanceDetail";
import { HttpMethod } from "./utils";
import { Response } from "../models/Response";

export class WorkerService extends BaseService {

  constructor() {
    super("mission/worker");
  }

  async getAllInstances(token: string): Promise<Instance[]> {
    //mock
    // return [1, 2, 3, 4, 5].map(x =>
    //   ({
    //     instanceId: x,
    //     workerUsername: "123",
    //     title: `Title${x}`,
    //     description: `Description `.repeat(x),
    //     missionId: 123,
    //     acceptDate: new Date(),
    //     submitDate: x % 2 === 0 ? new Date() : null,
    //     isSubmitted: x % 2 === 0,
    //     completedJobCount: x * 2,
    //     missionInstanceState: x % 2 === 0
    //       ? MissionInstanceState.SUBMITTED
    //       : MissionInstanceState.IN_PROGRESS,
    //   })
    // );

    const res = await this.fetch({
      token: token
    });
    console.log(res.response)
    return res.response.instances as Instance[];

  }

  async getInstanceDetail(missionId: number, token: string): Promise<ImageInstanceDetail> {

    // mock
    // return {
    //   results: [],
    //   instance:
    //     {
    //       instanceId: 1,
    //       workerUsername: "123",
    //       title: `Title`,
    //       description: `Description `,
    //       missionId: 123,
    //       acceptDate: new Date(),
    //       submitDate: null,
    //       isSubmitted: false,
    //       completedJobCount: 0,
    //       missionInstanceState: MissionInstanceState.IN_PROGRESS,
    //     }
    //
    // } as ImageInstanceDetail;

    const res = await this.fetch({
      token: token,
      route: missionId + "",
    });
    return res.response.detail as ImageInstanceDetail;
  }

  async saveProgress(missionId: number, detail: InstanceDetail, token: string): Promise<boolean> {


    // return true;

    // actual

    const res = await this.fetch({
      token: token,
      route: "" + missionId,
      method: HttpMethod.PUT
    });

    console.log(res.response)
    return res.ok;
  }

  async submit(missionId: number, detail: InstanceDetail, token: string): Promise<boolean> {


    // return true;

    // actual

    const res = await this.fetch({
      token: token,
      route: "" + missionId,
      method: HttpMethod.POST
    });

    return res.ok;
  }

  async acceptMission(missionId: number, token: string): Promise<Response> {

    // return {
    //   infoCode: 10000,
    //   description: "success"
    // };

    // actual

    const res = await this.fetch({
      route: missionId + "",
      body: {instance: null},
      token,
      method: HttpMethod.POST
    });

    return res.response;


    // const instanceDetailVo: InstanceDetail = {instance: null};
    // const res = await this.fetch({
    //   route: `worker/${missionId}`,
    //   body: instanceDetailVo,
    //   token: "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MjIzNzYzMDMsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1dPUktFUiJ9XSwidXNlcm5hbWUiOiIyMzQifQ.CW2aPW0T6H7UTgg5K5VCzaTXwmNcq5Y1wFIXl83yBjvG3ND8KVSiHpn6-F7JpJlb9h8zPb-BS6vGY7N7aMYNyQ",
    //   method: HttpMethod.POST
    // });
    // return res.response as Response;
  }
}

export const workerService = new WorkerService();
