import React from "react";
import { Menu } from 'antd';
import { inject, observer } from "mobx-react";
import { STORE_ROUTER, STORE_USER } from "../../constants/stores";
import { UserStoreProps } from "../../stores/UserStore";
import { RouterStoreProps } from "../../router/RouterStore";
// import { achievementPage, dashboardPage, missionsPage, personalInfoPage } from "../../router/routes/selfCenterRoutes";
const { SubMenu } = Menu;

interface Props extends UserStoreProps, RouterStoreProps {

}

// const routes = [achievementPage];

@inject(STORE_USER, STORE_ROUTER)
@observer
export class SelfSideMenu extends React.Component<Props, any> {

  // get selectedRoute() {
  //   const router = this.props[STORE_ROUTER];
  //   const currentRoute = routes.find(x => x.identify(router.path)) || notFoundPage;
  //   return currentRoute.path;
  // }

  render() {
    const userStore = this.props[STORE_USER];
    const router = this.props[STORE_ROUTER];

    return <div>
      <p>welcome, {userStore.user.username}</p>
    <Menu
      mode="inline"
      selectedKeys={[""]}
      style={{ height: '100%' }}
    >
      {/*<Menu.Item key={dashboardPage.path}>*/}
        {/*<span onClick={() => router.jumpTo(dashboardPage.path)}>*/}
          {/*<Icon type="dashboard" /><LocaleMessage id={"selfCenter.dashboard"}/>*/}
        {/*</span>*/}
      {/*</Menu.Item>*/}
      {/*<Menu.Item key={missionsPage.path}>*/}
        {/*<span onClick={() => router.jumpTo(missionsPage.path)}>*/}
          {/*<Icon type="tag-o" /><LocaleMessage id={"selfCenter.myMissions"}/>*/}
        {/*</span>*/}
      {/*</Menu.Item>*/}
      {/*<Menu.Item key={achievementPage.path}>*/}
        {/*<span onClick={() => router.jumpTo(achievementPage.path)}>*/}
          {/*<Icon type="star-o" /><LocaleMessage id={"selfCenter.achievement"}/>*/}
        {/*</span>*/}
      {/*</Menu.Item>*/}
      {/*<Menu.Item key={personalInfoPage.path}>*/}
        {/*<span onClick={() => router.jumpTo(personalInfoPage.path)}>*/}
          {/*<Icon type="info-o" /><LocaleMessage id={"selfCenter.personalInfo"}/>*/}
        {/*</span>*/}
      {/*</Menu.Item>*/}
    </Menu>
    </div>;
  }

}
