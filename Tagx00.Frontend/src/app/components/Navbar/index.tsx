import React from "react";
import { Icon, Menu, Popover } from 'antd';
import { LocaleMessage } from "../../internationalization/components";
import { observer } from "mobx-react";
import { NavbarUserIndicator } from "./NavbarUserIndicator";
import { Link } from "react-router-dom";
import { LanguageSelector } from "../LanguageSelector";
import { NavbarModals } from "./NavbarModals";
import { Inject } from "react.di";
import { RouterStore } from "../../stores/RouterStore";
import { SvgImg } from "../Common/SvgImg";
import {
  DropdownContainer,
  dropdownMenuStyle,
  horizontalMenuStyle,
  LogoDiv,
  MobileNavContainer,
  NavItem,
  RightDiv,
  Row,
  SvgImgContainer
} from "./Layout";

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
class NavbarMenu extends React.Component<{ dropdownMode: boolean }> {

  @Inject routerStore: RouterStore;

  get selectedRoute() {
    return routes.filter(x => x.match(this.routerStore.path)).map(x => x.path)
  }

  render() {
    return <Menu
      theme="light"
      mode={this.props.dropdownMode ? "inline" : "horizontal"}
      selectedKeys={this.selectedRoute}
      style={this.props.dropdownMode ? dropdownMenuStyle : horizontalMenuStyle}
    >
      {routes.map(x => (
        <Menu.Item key={x.path}>
          <Link to={x.path}>
           <span>
              <Icon type={x.iconName}/>
              <LocaleMessage id={x.id}/>
           </span>
          </Link>
        </Menu.Item>

      ))}
    </Menu>
  }
}

export class Navbar extends React.Component<{}, {}> {

  dropdownContainerRef = (React as any).createRef();

  render() {
    return <Row>
      <LogoDiv>
        <SvgImgContainer>
          <SvgImg filePath={"tag_x00_mini_logo.svg"} width={180} height={30}/>
        </SvgImgContainer>
        <MobileNavContainer>
          <NavbarUserIndicator/>
          <LanguageSelector/>
        <DropdownContainer innerRef={this.dropdownContainerRef}>
          <Popover getPopupContainer={() => this.dropdownContainerRef.current} trigger={"click"} placement={"bottomRight"} content={
            <NavbarMenu dropdownMode={true}/>
          }>
            <Icon type="menu-fold"/>
          </Popover>
        </DropdownContainer>
        </MobileNavContainer>
      </LogoDiv>
      <RightDiv>
        <NavItem>
          <LanguageSelector/>
        </NavItem>
        <NavItem>
          <NavbarUserIndicator/>
        </NavItem>
        <NavItem>
          <NavbarMenu dropdownMode={false}/>
        </NavItem>
        <NavbarModals/>
      </RightDiv>
    </Row>;
  }
}
