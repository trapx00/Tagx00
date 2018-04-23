import React from 'react';
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";

interface Props {

}

export class MissionPayPage extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  render() {
    return null;
  }
}
