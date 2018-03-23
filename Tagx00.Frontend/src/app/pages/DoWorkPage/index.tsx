import React from "react";
import { ImageWorkPage } from "./image/ImageWorkPage";
import { workerService } from "../../api/WorkerService";
import { inject, observer } from "mobx-react";
import { STORE_LOCALE, STORE_ROUTER, STORE_USER } from "../../constants/stores";
import { UserStoreProps } from "../../stores/UserStore";
import { AsyncComponent } from "../../router/AsyncComponent";
import { missionService } from "../../api/MissionService";
import { RouterStoreProps } from "../../router/RouterStore";
import { Loading } from "../../components/Common/Loading";
import { LocaleMessage, Localize } from "../../internationalization/components";

interface Props extends UserStoreProps, RouterStoreProps {
  missionId: number;
  readonly: boolean;
}

@inject(STORE_USER, STORE_ROUTER)
@observer
export class DoWorkPage extends React.Component<Props, any> {

  renderTruePage = async () => {
    const userStore = this.props[STORE_USER];
    const instanceDetail = await workerService.getInstanceDetail(this.props.missionId, userStore.token);

    const missionDetail = await missionService.getAMission(this.props.missionId);

    return <Localize replacements={{
      workSaved: "drawingPad.common.finish.workSaved",
      readonlyComplete: "drawingPad.common.finish.readonlyComplete"
    }}>
      {props => <ImageWorkPage instanceDetail={instanceDetail}
                          missionDetail={missionDetail}
                          token={userStore.token}
                          jumpBack={() => this.props[STORE_ROUTER].jumpTo("/missions")}
                          readonlyMode={this.props.readonly}
                               readonlyCompleteText={props.readonlyComplete}
                               workSavedText={props.workSaved}
      />
                               }



    </Localize>



  };

  render() {
    const userStore = this.props[STORE_USER];
    if (userStore.loggedIn) {
      return <AsyncComponent
        render={this.renderTruePage}
        componentWhenLoading={<Loading/>}/>
    } else {
      return <div>
        <LocaleMessage id={"missions.needLogin"}/>
      </div>
    }
  }
}
