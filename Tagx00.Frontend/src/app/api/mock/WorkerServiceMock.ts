import { Injectable } from "react.di";
import { Instance } from "../../models/instance/Instance";
import { MissionInstanceState } from "../../models/instance/MissionInstanceState";
import { ImageInstanceDetail } from "../../models/instance/image/ImageInstanceDetail";
import { InstanceDetail } from "../../models/instance/InstanceDetail";
import { Response } from "../../models/response/Response";
import { WorkerService } from "../WorkerService";
import { WorkerInfo } from "../../models/userInfo/WorkerInfo";
import { MissionType } from "../../models/mission/Mission";
import { InstanceDetailResponse } from "../../models/response/mission/InstanceDetailResponse";
import { TextInstanceDetail } from "../../models/instance/text/TextInstanceDetail";
import { AudioInstance } from "../../models/instance/audio/AudioInstance";
import { AudioInstanceDetail } from "../../models/instance/audio/AudioInstanceDetail";
import { VideoInstanceDetail } from "../../models/instance/video/VideoInstanceDetail";
import { ThreeDimensionInstanceDetail } from "../../models/instance/3d/3dInstanceDetail";
import { HttpMethod } from "../utils";

const textInstance = {
    textResults: [],
    instance: {
      instanceId: 1 + "",
      workerUsername: "123",
      title: `Title`,
      description: `Description `,
      missionId: "1",
      acceptDate: new Date(),
      submitDate: null,
      isSubmitted: false,
      completedJobsCount: 0,
      missionInstanceState: MissionInstanceState.IN_PROGRESS,
    },
    missionType: MissionType.TEXT
  } as TextInstanceDetail;

const imgInstance = {
      imageResults: [],
      instance: {
        instanceId: 1 + "",
        workerUsername: "123",
        title: `Title`,
        description: `Description `,
        missionId: "1",
        acceptDate: new Date(),
        submitDate: null,
        isSubmitted: false,
        completedJobsCount: 0,
        missionInstanceState: MissionInstanceState.IN_PROGRESS,
      },
      missionType: MissionType.IMAGE,
    } as ImageInstanceDetail;

const audioInstance = {
  resultList: [],
  missionType: MissionType.AUDIO,
  instance: {
    instanceId: 1 + "",
    workerUsername: "123",
    title: `Title`,
    description: `Description `,
    missionId: "1",
    acceptDate: new Date(),
    submitDate: null,
    isSubmitted: false,
    completedJobsCount: 0,
    missionInstanceState: MissionInstanceState.IN_PROGRESS,
  }
} as AudioInstanceDetail;

const videoInstance = {
  resultList: [],
  missionType: MissionType.VIDEO,
  instance: {
    instanceId: 1 + "",
    workerUsername: "123",
    title: `Title`,
    description: `Description `,
    missionId: "1",
    acceptDate: new Date(),
    submitDate: null,
    isSubmitted: false,
    completedJobsCount: 0,
    missionInstanceState: MissionInstanceState.IN_PROGRESS,
  }
} as VideoInstanceDetail;

const threeDimensionInstance = {
  resultList: [],
  missionType: MissionType.THREE_DIMENSION,
  instance: {
    instanceId: 1 + "",
    workerUsername: "123",
    title: `Title`,
    description: `Description `,
    missionId: "1",
    acceptDate: new Date(),
    submitDate: null,
    isSubmitted: false,
    completedJobsCount: 0,
    missionInstanceState: MissionInstanceState.IN_PROGRESS,
  }
} as ThreeDimensionInstanceDetail;


@Injectable
export class WorkerServiceMock extends WorkerService {

  async getAllInstances(): Promise<Instance[]> {
    //mock
    return [1, 2, 3, 4, 5].map(x =>
      ({
        instanceId: x + "",
        workerUsername: "123",
        title: `Title${x}`,
        description: `Description `.repeat(x),
        missionId: "123",
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

  async getInstanceDetail(missionId: string): Promise<InstanceDetailResponse> {


    return {
      detail: imgInstance
    };


      // return {
    //   detail: {
    //     imageResults: [],
    //     instance: {
    //       instanceId: 1 + "",
    //       workerUsername: "123",
    //       title: `Title`,
    //       description: `Description `,
    //       missionId: missionId,
    //       acceptDate: new Date(),
    //       submitDate: null,
    //       isSubmitted: false,
    //       completedJobsCount: 0,
    //       missionInstanceState: MissionInstanceState.IN_PROGRESS,
    //     },
    //     missionType: MissionType.IMAGE,
    //   } as ImageInstanceDetail
    // };
  }

  async saveProgress(missionId: string, detail: InstanceDetail): Promise<boolean> {
    return true;
  }

  async submit(missionId: string, detail: InstanceDetail): Promise<boolean> {
    return true;
  }

  async acceptMission(missionId: string): Promise<Response> {
    return {
      infoCode: 10000,
      description: "success"
    };
  }

  async segmentWord(content: string): Promise<string[]> {
    return ["我","是","古鲁特","！"];
  }

  async getWorkerInfo(username: string): Promise<WorkerInfo> {
    return {
      username: "worker",
      email: "1@1.com",
      credits: 23,
      exp: 150,
      level: 1,
      completedMissionCount: 30,
      acceptedMissionCount: 130,
      inProgressMissionCount: 30,
      abandonedMissionCount: 10,
      finalizedMissionCount: 60,
    } as WorkerInfo
  }

  async abandonMission(missionId: string): Promise<Response> {
    return {
      infoCode: 10000,
      description: "success"
    };
  }

}

