import React from "react";
import { ImageWorkPage } from "./image/ImageWorkPage";
import { workerService } from "../../api/WorkerService";
import { observer } from "mobx-react";
import { UserStore} from "../../stores/UserStore";
import { AsyncComponent } from "../../router/AsyncComponent";
import { missionService } from "../../api/MissionService";
import { RouterStore} from "../../router/RouterStore";
import { Loading } from "../../components/Common/Loading";
import { LocaleMessage, Localize } from "../../internationalization/components";
import { Inject } from "react.di";

interface Props  {
  missionId: number;
  readonly: boolean;
}

@observer
export class DoWorkPage extends React.Component<Props, any> {

  @Inject userStore: UserStore;
  @Inject routerStore: RouterStore;

  renderTruePage = async () => {
    const instanceDetail = await workerService.getInstanceDetail(this.props.missionId, this.userStore.token);

    const missionDetail = await missionService.getAMission(this.props.missionId, this.userStore.token);

    return <Localize replacements={{
      workSaved: "drawingPad.common.finish.workSaved",
      readonlyComplete: "drawingPad.common.finish.readonlyComplete"
    }}>
      {props => <ImageWorkPage instanceDetail={instanceDetail}
                               missionDetail={missionDetail}
                               token={this.userStore.token}
                               jumpBack={() => this.routerStore.jumpTo("/missions")}
                               readonlyMode={this.props.readonly}
                               readonlyCompleteText={props.readonlyComplete}
                               workSavedText={props.workSaved}
      />
      }


    </Localize>


  };

  render() {
    if (this.userStore.loggedIn) {
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
