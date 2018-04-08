import React from "react";
import { Col, Icon, Menu, Row } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import { observer } from "mobx-react";
import { NavbarUserIndicator } from "./NavbarUserIndicator";
import { Link } from "react-router-dom";
import { LanguageSelector } from "../LanguageSelector";
import { NavbarModals } from "./NavbarModals";
import { Inject } from "react.di";
import { RouterStore } from "../../stores/RouterStore";
import styled from "styled-components";

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

const NavItem = styled.div`
    float: right;
    display: inline-block;
    margin-left: 8px;
    margin-right: 8px;
`;

const CenterCol = styled(Col)`
    display: inline-block;
    margin: auto;
    text-align:center;
`;

const RightCol = styled(Col)`
    display: inline-block;
    float: right;
    @media (max-width: 768px) {
        display: none;
    }
`;

@observer
export class Navbar extends React.Component<{}, {}> {

  @Inject routerStore: RouterStore;

  get selectedRoute() {
    return routes.filter(x => x.match(this.routerStore.path)).map(x => x.path)
  }

  render() {
    return <Row>
      {/*<span>*/}
      {/*<SvgImg filePath={"logo.svg"} width={56} height={56}/>*/}
      {/*</span>*/}
      <CenterCol xs={24} md={3}>
        <span>Tag x00</span>
      </CenterCol>
      <RightCol span={21}>
        <NavItem>
          <LanguageSelector/>
        </NavItem>
        <NavItem>
          <NavbarUserIndicator/>
        </NavItem>
        <NavItem>
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
        </NavItem>
        <NavbarModals/>
      </RightCol>
    </Row>;
  }
}
