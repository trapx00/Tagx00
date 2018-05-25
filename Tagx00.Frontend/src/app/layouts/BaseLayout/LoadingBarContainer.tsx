import React from 'react';
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { NavStore } from "../../stores/NavStore";
import { PageWideLoadingBar } from "../../components/PageWideLoadingBar";

interface Props {

}

@observer
export class LoadingBarContainer extends React.Component<Props, {}> {


  @Inject navStore: NavStore;

  render() {
    if (this.navStore.pageWideLoadingBarShown) {
      return <PageWideLoadingBar/>
    }
    return null;
  }
}
