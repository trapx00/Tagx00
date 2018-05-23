import React from 'react';
import { Button, message } from 'antd';
import { Inject } from "react.di";
import { UserStore } from "../../../stores/UserStore";
import { WorkerService } from "../../../api/WorkerService";
import { LocaleMessage } from "../../../internationalization/components";
import { Link } from 'react-router-dom';
import { AsyncComponent } from "../../../router/AsyncComponent";
import { LocaleStore } from "../../../stores/LocaleStore";
import { MissionPublicItem } from "../../../models/mission/Mission";
import { UserService } from "../../../api/UserService";
import { LeaderboardService } from "../../../api/LeaderboardService";


interface Props {
  missionPublicItem: MissionPublicItem;
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
    const { missionId } = this.props.missionPublicItem;
    await this.workerService.acceptMission(missionId);
    message.success(this.localeStore.get(ID_PREFIX + "accepted"));
    this.setState(prev => ({key: prev.key+1}));
  };

  renderContent = async () => {
    const { missionId, minimalWorkerLevel } = this.props.missionPublicItem;
    try {
      const detail = await this.workerService.getInstanceDetail(missionId);
      return <p>
        <Link to={`/mission/worker/${missionId}/doWork`}>
          <Button><LocaleMessage id={ID_PREFIX + "continueWorking"}/></Button>
        </Link>
        <Link to={`/mission/worker/${missionId}`}>
          <Button><LocaleMessage id={ID_PREFIX + "seeResult"}/></Button>
        </Link>
      </p>
    } catch (e) {
      if (e.statusCode === 404) { // not accepted
        const level = (await this.workerService.getWorkerInfo(this.userStore.user.username)).level;
        console.log(level);
        if (level >= minimalWorkerLevel) {
          return <Button type={"primary"} onClick={this.accept}><LocaleMessage id={ID_PREFIX + "accept"}/></Button>;
        } else {
          return <Button disabled type={"primary"}><LocaleMessage id={ID_PREFIX + "levelNotEnough"}/></Button>;
        }
      } else {
        return <div/>
      }
    }

  };

  render() {
    return <AsyncComponent key={this.state.key} render={this.renderContent}/>;
  }
}
