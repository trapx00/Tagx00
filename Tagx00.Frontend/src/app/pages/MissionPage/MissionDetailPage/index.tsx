import React from 'react';
import { Inject } from "react.di";
import { MissionService } from "../../../api/MissionService";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { Loading } from "../../../components/Common/Loading";
import { ImageMissionDetailPage } from "./ImageMissionDetailPage";
import { requireLogin } from "../../hoc/RequireLogin";
import { TextMissionDetailPage } from "./TextMissionDetailPage";
import { MissionType } from "../../../models/mission/Mission";
import { TextMissionDetail } from "../../../models/mission/text/TextMissionDetail";
import { ImageMissionDetail } from "../../../models/mission/image/ImageMission";

interface Props {
  missionId: string;
  token?: string;
}


@requireLogin()
export class MissionDetailPage extends React.Component<Props, {}> {


  @Inject missionService: MissionService;

  renderPage = async () => {
    console.log(this.props.token);
    const detail = await this.missionService.getAMission(this.props.missionId);
    switch (detail.publicItem.missionType) {
      case MissionType.TEXT:
        return <TextMissionDetailPage detail={detail as TextMissionDetail}/>;
      case MissionType.IMAGE:
        return <ImageMissionDetailPage detail={detail as ImageMissionDetail}/>;
    }
    return null;
  };

  render() {
    return <AsyncComponent render={this.renderPage} componentWhenLoading={<Loading/>}/>;
  }
}
