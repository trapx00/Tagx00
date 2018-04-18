import React from "react";
import {UserStore} from "../../../stores/UserStore";
import {Inject} from "react.di";
import {WorkerInfoPage} from "./WorkerInfoPage";
import {RequesterInfoPage} from "./RequesterInfoPage";
import { UserRole } from "../../../models/user/User";

export class PersonalInfoPage extends React.Component<{},{}> {

    @Inject userStore:UserStore;

    render(){
        const role = this.userStore.user.role;
        switch(role) {
            case UserRole.ROLE_WORKER:
                return <WorkerInfoPage/>;
            case UserRole.ROLE_REQUESTER:
                return <RequesterInfoPage/>;
            default:
                return null;
        }
    }

}