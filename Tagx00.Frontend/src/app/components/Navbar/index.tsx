import React from "react";
import { Col, Menu, Row, Icon } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import { inject, observer } from "mobx-react";
import { STORE_ROUTER } from "../../constants/stores";
import { RouterStoreProps } from "../../router/RouterStore";
import { NavbarUserIndicator } from "./NavbarUserIndicator";
import { Link } from "react-router-dom";
import { LanguageSelector } from "../LanguageSelector";
import * as style from './style.css';
import { NavbarModals } from "./NavbarModals";
import { notFoundPage } from "../../router/routes/notFoundRoute";
import { NavMenuItem } from "../Common/NavMenuItem";

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


@inject(STORE_ROUTER)
@observer
export class Navbar extends React.Component<RouterStoreProps, any> {

  get selectedRoute() {
    const router = this.props[STORE_ROUTER];
    return routes.filter(x => x.match(router.path)).map(x => x.path)
  }

  render() {

    console.log(this.selectedRoute);

    return <Row>
      {/*<span>*/}
      {/*<SvgImg filePath={"logo.svg"} width={56} height={56}/>*/}
      {/*</span>*/}
      <Col span={4}>
        <span>Tag x00</span>
      </Col>
      <Col span={20}>
        <div className={style.right}>
          <LanguageSelector/>
        </div>
        <div className={style.right}>
          <NavbarUserIndicator/>
        </div>
        <div className={style.right}>
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
