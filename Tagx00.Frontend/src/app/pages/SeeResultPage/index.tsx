import React from 'react';
import { missionService } from "../../api/MissionService";
import { STORE_ROUTER, STORE_USER } from "../../constants/stores";
import { workerService } from "../../api/WorkerService";
import { ImageWorkPage } from "../DoWorkPage/image/ImageWorkPage";
import { AsyncComponent } from "../../router/AsyncComponent";
import { Loading } from "../../components/Common/Loading";
import { LocaleMessage } from "../../internationalization/components";
import { UserStoreProps } from "../../stores/UserStore";
import { inject, observer } from "mobx-react";
import { DoWorkPage } from "../DoWorkPage";

interface Props extends UserStoreProps {
  missionId: number;
}

export class SeeResultPage extends React.Component<Props, {}> {


  render() {
    return <DoWorkPage missionId={this.props.missionId} readonly={true}/>;
  }
}
