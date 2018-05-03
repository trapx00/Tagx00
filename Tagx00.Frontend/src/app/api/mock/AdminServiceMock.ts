import {Injectable} from "react.di";
import {AdminService} from "../AdminService";
import {AdminInfo} from "../../models/userInfo/AdminInfo";

@Injectable
export class AdminServiceMock extends AdminService {
    async getAdminInfo(token: string): Promise<AdminInfo> {
       return {
           userCount: 100,
           totalMissionCount: 1000,
           totalInstanceCount: 10000,
           inProgressInstanceCount: 2000,
           submittedInstanceCount: 3000,
           finalizeInstanceCount: 5000,
         listOfInstanceDateNum: [
           {
             date: "2018-4-27",
             num: 10
           },
           {
             date: "2018-4-28",
             num: 5
           },
           {
             date: "2018-4-29",
             num: 12
           },
         ]
       } as AdminInfo;
    };
}
