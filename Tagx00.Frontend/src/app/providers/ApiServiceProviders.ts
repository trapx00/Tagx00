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
import {AdminService} from "../api/AdminService";
import {AdminServiceMock} from "../api/mock/AdminServiceMock";

export const apiServiceProviders: Binding[] = [
  {provide: MissionService, useClass: MissionServiceMock},
  {provide: UserService, useClass: UserServiceMock },
  {provide: WorkerService, useClass: WorkerServiceMock},
  {provide: RequesterService, useClass: RequesterServiceMock},
    {provide: AdminService, useClass: AdminServiceMock},
  {provide: HttpService, useClass: HttpService}
];
