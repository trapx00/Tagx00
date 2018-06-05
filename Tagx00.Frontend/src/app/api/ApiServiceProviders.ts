import { Binding } from "react.di";
import { MissionService } from "./MissionService";
import { MissionServiceMock } from "./mock/MissionServiceMock";
import { UserService } from "./UserService";
import { UserServiceMock } from "./mock/UserServiceMock";
import { WorkerService } from "./WorkerService";
import { WorkerServiceMock } from "./mock/WorkerServiceMock";
import { RequesterService } from "./RequesterService";
import { RequesterServiceMock } from "./mock/RequesterServiceMock";
import { HttpService } from "./HttpService";
import { AdminService } from "./AdminService";
import { AdminServiceMock } from "./mock/AdminServiceMock";
import { PayService } from "./PayService";
import { PayServiceMock } from "./mock/PayServiceMock";
import { TopicService } from "./TopicService";
import { TopicServiceMock } from "./mock/TopicServiceMock";
import { LeaderboardService } from "./LeaderboardService";
import { LeaderboardServiceMock } from "./mock/LeaderboardServiceMock";

const useMock = true;

export const apiServiceProviders: Binding[] = [
  {provide: MissionService, useClass: useMock ? MissionServiceMock : MissionService},
  {provide: UserService, useClass: useMock ? UserServiceMock : UserService},
  {provide: WorkerService, useClass: useMock ? WorkerServiceMock : WorkerService},
  {provide: RequesterService, useClass: useMock ? RequesterServiceMock : RequesterService},
  {provide: AdminService, useClass: useMock ? AdminServiceMock : AdminService},
  {provide: PayService, useClass: useMock ? PayServiceMock : PayService},
  {provide: TopicService, useClass: useMock ? TopicServiceMock : TopicService},
  {provide: LeaderboardService, useClass: useMock ? LeaderboardServiceMock : LeaderboardService},
  {provide: HttpService, useClass: HttpService}
];
