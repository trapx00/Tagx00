import { STORE_UI } from "../../../constants/stores";
import { UiStoreProps } from "../../../stores/UiStore";
import { inject, observer } from "mobx-react";
import React from "react";
import { AsyncComponent } from "../../../router/AsyncComponent";


interface NavbarModalsProps extends UiStoreProps {
}

@inject(STORE_UI)
@observer
export class NavbarModals extends React.Component<NavbarModalsProps, any> {

  loadLoginModal = async () => {
    const ui = this.props[STORE_UI];
    ui.setLoginModalLoading(true);
    const Modal = (await import("../../Modals/LoginModal")).LoginModal;
    ui.setLoginModalLoading(false);
    return <Modal/>;
  };

  // loadRegisterModal = async () => {
  //   const ui = this.props[STORE_UI];
  //   ui.startLoadingRegisterModal();
  //   const Modal = (await import(".//RegisterModal")).RegisterModal;
  //   ui.finishedLoadingRegisterModal();
  //   return <Modal/>;
  // };

  render() {
    const ui = this.props[STORE_UI];
    return <div>
      {ui.loginModalShown
        ? <AsyncComponent render={this.loadLoginModal}/>
        : null}
    </div>;
  }
}

