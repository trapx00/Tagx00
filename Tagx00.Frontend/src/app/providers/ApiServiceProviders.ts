import { Binding } from "react.di";
import { MissionService } from "../api/MissionService";
import { MissionServiceMock } from "../api/mock/MissionServiceMock";
import { UserService } from "../api/UserService";
import { UserServiceMock } from "../api/mock/UserServiceMock";
import { WorkerService } from "../api/WorkerService";
import { WorkerServiceMock } from "../api/mock/WorkerServiceMock";
import { RequesterService } from "../api/RequesterService";
import { RequesterServiceMock } from "../api/mock/RequesterServiceMock";
import { HttpService } from "../api/HttpService";
import { AdminService } from "../api/AdminService";
import { AdminServiceMock } from "../api/mock/AdminServiceMock";
import { PayService } from "../api/PayService";
import { PayServiceMock } from "../api/mock/PayServiceMock";
import { TopicService } from "../api/TopicService";
import { TopicServiceMock } from "../api/mock/TopicServiceMock";

const useMock = false;

export const apiServiceProviders: Binding[] = [
  {provide: MissionService, useClass: useMock ? MissionServiceMock : MissionService},
  {provide: UserService, useClass: useMock ? UserServiceMock : UserService},
  {provide: WorkerService, useClass: useMock ? WorkerServiceMock : WorkerService},
  {provide: RequesterService, useClass: useMock ? RequesterServiceMock : RequesterService},
  {provide: AdminService, useClass: useMock ? AdminServiceMock : AdminService},
  {provide: PayService, useClass: useMock ? PayServiceMock : PayService},
  {provide: TopicService, useClass: useMock ? TopicServiceMock : TopicService},
  {provide: HttpService, useClass: HttpService}
];
