import React from 'react';
import { Inject } from "react.di";
import { MissionService } from "../../../api/MissionService";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";
import { ImageMissionDetailPage } from "./ImageMissionDetailPage";
import { requireLogin } from "../../hoc/RequireLogin";
import { UserRole } from "../../../models/user/User";

interface Props {
  missionId: string;
  token?: string;
}


@requireLogin()
export class MissionDetailPage extends React.Component<Props, {}> {


  @Inject missionService: MissionService;

  renderPage = async () => {
    console.log(this.props.token);
    const detail = await this.missionService.getAMission(this.props.missionId, this.props.token);
    return <ImageMissionDetailPage detail={detail}/>
  };

  render() {
    return <AsyncComponent render={this.renderPage} componentWhenLoading={<Loading/>}/>;
  }
}
