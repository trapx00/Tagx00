import React from "react";
import { Col, Menu, Row } from 'antd';
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
import { homePage } from "../../router/routes/rootRoutes";


@inject(STORE_ROUTER)
@observer
export class Navbar extends React.Component<RouterStoreProps, any> {

  get selectedRoute() {
    const router = this.props[STORE_ROUTER];
    const currentRoute = [].find(x => x.identify(router.path)) || notFoundPage;
    return currentRoute.path;
  }

  render() {



    return <Row>
      {/*<span>*/}
      {/*<SvgImg filePath={"logo.svg"} width={56} height={56}/>*/}
      {/*</span>*/}
      <Col span={4}>
        <span>Tag x00</span>
      </Col>
      <Col span={10}>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[this.selectedRoute]}
          style={{lineHeight: '64px'}}
        >
          {/*<Menu.Item key={homePage.path}>*/}
            {/*<Link to={homePage.path}>*/}
              {/*<LocaleMessage id={"navbar.home"}/>*/}
            {/*</Link>*/}
          {/*</Menu.Item>*/}
          {/*<Menu.Item key={browsePage.path}>*/}
            {/*<Link to={browsePage.path}>*/}
              {/*<LocaleMessage id={"navbar.browse"}/>*/}
            {/*</Link>*/}
          {/*</Menu.Item>*/}
          {/*<Menu.Item key={aboutPage.path}>*/}
            {/*<Link to={aboutPage.path}>*/}
              {/*<LocaleMessage id={"navbar.about"}/>*/}
            {/*</Link>*/}
          {/*</Menu.Item>*/}
        </Menu>
      </Col>
      <Col span={10}>
        <div className={style.rightButtons}>
          <LanguageSelector/>
        </div>
        <div className={style.rightButtons}>
          <NavbarUserIndicator/>
        </div>
        <NavbarModals/>
      </Col>
    </Row>;
  }
}
