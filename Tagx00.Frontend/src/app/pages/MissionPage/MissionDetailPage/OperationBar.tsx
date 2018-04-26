import React from 'react';
import { Button, message } from 'antd';
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { WorkerService } from "../../../api/WorkerService";
import { LocaleMessage } from "../../../internationalization/components";
import { Link } from 'react-router-dom';
import { AsyncComponent } from "../../../router/AsyncComponent";
import { LocaleStore } from "../../../stores/LocaleStore";


interface Props {
  missionId: string;
}

interface State {
  key: number;
}

const ID_PREFIX= "missions.worker.detailOperationBar.";

export class OperationBar extends React.Component<Props, State> {

  @Inject userStore: UserStore;
  @Inject workerService: WorkerService;

  @Inject localeStore: LocaleStore;

  state = {
    key: 0
  };

  accept = async () => {
    await this.workerService.acceptMission(this.props.missionId, this.userStore.token);
    message.success(this.localeStore.get(ID_PREFIX + "accepted"));
    this.setState(prev => ({key: prev.key+1}));
  };

  renderContent = async () => {
    try {
      const detail = await this.workerService.getInstanceDetail(this.props.missionId, this.userStore.token);
      return <p>
        <Link to={`/mission/worker/${this.props.missionId}/doWork`}>
          <Button><LocaleMessage id={ID_PREFIX + "continueWorking"}/></Button>
        </Link>
        <Link to={`/mission/worker/${this.props.missionId}`}>
          <Button><LocaleMessage id={ID_PREFIX + "seeResult"}/></Button>
        </Link>
      </p>
    } catch (e) {
      if (e.statusCode === 404) { // not accepted
        return <Button type={"primary"} onClick={this.accept}><LocaleMessage id={ID_PREFIX + "accept"}/></Button>;
      } else {
        return <div/>
      }
    }

  };

  render() {
    return <AsyncComponent key={this.state.key} render={this.renderContent}/>;
  }
}
