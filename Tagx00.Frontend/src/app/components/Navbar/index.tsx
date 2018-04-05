import React from "react";
import { Col, Icon, Menu, Row } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import { observer } from "mobx-react";
import { STORE_ROUTER } from "../../constants/stores";
import { NavbarUserIndicator } from "./NavbarUserIndicator";
import { Link } from "react-router-dom";
import { LanguageSelector } from "../LanguageSelector";
import * as style from './style.css';
import { NavbarModals } from "./NavbarModals";
import { Inject } from "react.di";
import { RouterStore } from "../../router/RouterStore";

// import pages will result in circular dependency and I can't figure out why
// hard-code is the only option :(

const routes = [
  {
    path: "/",
    iconName: "home",
    id: "navbar.home",
    match: (pathname: string) => pathname == "/"
  }, {
    path: "/browse",
    iconName: "cloud",
    id: "navbar.browse",
    match: (pathname: string) => pathname.startsWith("/browse")
  }, {
    path: "/missions",
    iconName: "tag-o",
    id: "navbar.mission",
    match: (pathname: string) => pathname.startsWith("/missions")
  }, {
    path: "/about",
    iconName: "info-circle",
    id: "navbar.about",
    match: (pathname: string) => pathname.startsWith("/about")
  },
];


@observer
export class Navbar extends React.Component<{}, {}> {

  @Inject routerStore: RouterStore;

  get selectedRoute() {
    return routes.filter(x => x.match(this.routerStore.path)).map(x => x.path)
  }

  render() {

    console.log(this.selectedRoute);

    return <Row>
      {/*<span>*/}
      {/*<SvgImg filePath={"logo.svg"} width={56} height={56}/>*/}
      {/*</span>*/}
      <Col xs={24} md={4} className={style.center}>
        <span>Tag x00</span>
      </Col>
      <Col span={20} className={style.rightColumns}>
        <div className={style.navItem}>
          <LanguageSelector/>
        </div>
        <div className={style.navItem}>
          <NavbarUserIndicator/>
        </div>
        <div className={style.navItem}>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={this.selectedRoute}
            style={{lineHeight: '64px'}}
          >
            {routes.map(x => <Menu.Item key={x.path}>
              <Link to={x.path}>
                <span><Icon type={x.iconName}/><LocaleMessage id={x.id}/></span>
              </Link>

            </Menu.Item>)}
          </Menu>
        </div>
        <NavbarModals/>
      </Col>
    </Row>;
  }
}
