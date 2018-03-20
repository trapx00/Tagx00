import React from "react";
import { Menu, Row, Col } from 'antd';
import { SvgImg } from "../Common/SvgImg";
import { aboutPage, browsePage, homePage } from "../../routes/routes";
import { LocaleMessage } from "../../internationalization/components";
import { inject, observer } from "mobx-react";
import { STORE_ROUTER } from "../../constants/stores";
import { RouterStoreProps } from "../../routes/RouterStore";
import { NavbarUserIndicator } from "./NavbarUserIndicator";
import { Link } from "../Common/Link";
import { LanguageSelector } from "../LanguageSelector";

@inject(STORE_ROUTER)
@observer
export class Navbar extends React.Component<RouterStoreProps, any> {
  render() {
    const router = this.props[STORE_ROUTER];

    const selectedRoute = router.currentPage.id;

    return <Row>
      {/*<span>*/}
      {/*<SvgImg filePath={"logo.svg"} width={56} height={56}/>*/}
      {/*</span>*/}
      <Col span={4}>
        <span>Tag x00</span>
      </Col>
      <Col span={16}>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedRoute]}
          style={{lineHeight: '64px'}}
        >
          <Menu.Item key={homePage.id}>
            <Link to={homePage.path}>
              <LocaleMessage id={"navbar.home"}/>
            </Link>
          </Menu.Item>
          <Menu.Item key={browsePage.id}>
            <Link to={browsePage.path}>
              <LocaleMessage id={"navbar.browse"}/>
            </Link>
          </Menu.Item>
          <Menu.Item key={aboutPage.id}>
            <Link to={aboutPage.path}>
              <LocaleMessage id={"navbar.about"}/>
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={2}>
        <LanguageSelector/>
      </Col>
      <Col span={2}>
        <NavbarUserIndicator/>
      </Col>
    </Row>;
  }
}
