import React, { ReactNode } from "react";
import { Icon, Menu } from 'antd';
import { LocaleMessage } from "../../../internationalization/components";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { RouterStore } from "../../../stores/RouterStore";
import { NavItemProps, NavStore } from "../../../stores/NavStore";

const {SubMenu} = Menu;

// import pages will result in circular dependency and I can't figure out why
// hard-code is the only option :(


const routes: NavItemProps[] = [
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
    path: "/mission",
    iconName: "tag-o",
    id: "navbar.mission",
    match: (pathname: string) => pathname.startsWith("/mission")
  }, {
    path: "/leaderboard",
    iconName: "bars",
    id: "navbar.leaderboard",
    match: (pathname: string) => pathname.startsWith("/leaderboard")
  }, {
    path: "/about",
    iconName: "info-circle",
    id: "navbar.about",
    match: (pathname: string) => pathname.startsWith("/about")
  },
];


@observer
export class MainNav extends React.Component<{}, {}> {

  @Inject routerStore: RouterStore;
  @Inject navStore: NavStore;

  get selectedRoute() {
    return routes.filter(x => x.match(this.routerStore.path)).map(x => x.path)
  }

  jumpTo = (path: string) => {
    this.routerStore.jumpTo(path);
  };

  render() {
    return <div>
      <div className={"logo"}>
        Tag x00
      </div>
      <Menu
        theme="dark"
        mode={"inline"}
        selectedKeys={this.selectedRoute}
      >
        {routes.map(x =>
          <Menu.Item key={x.path}>
            <Icon type={x.iconName}/>
            <span onClick={() => this.jumpTo(x.path)}>
            <LocaleMessage id={x.id}/>
          </span>
          </Menu.Item>
        )}
      </Menu>
    </div>

    // return <Row>
    //   <LogoDiv>
    //     <Link to={"/browse"}>
    //     <SvgImgContainer>
    //       <SvgImg filePath={"tag_x00_mini_logo.svg"} width={180} height={30}/>
    //     </SvgImgContainer>
    //     </Link>
    //     <MobileNavContainer>
    //       <NavbarUserIndicator/>
    //       <LanguageSelector/>
    //     <DropdownContainer innerRef={this.dropdownContainerRef}>
    //       <Popover getPopupContainer={() => this.dropdownContainerRef.current} trigger={"click"} placement={"bottomRight"} content={
    //         <NavbarMenu dropdownMode={true}/>
    //       }>
    //         <Icon type="menu-fold"/>
    //       </Popover>
    //     </DropdownContainer>
    //     </MobileNavContainer>
    //   </LogoDiv>
    //   <RightDiv>
    //     <NavItem>
    //       <LanguageSelector/>
    //     </NavItem>
    //     <NavItem>
    //       <NavbarUserIndicator/>
    //     </NavItem>
    //     <NavItem>
    //       <NavbarMenu dropdownMode={false}/>
    //     </NavItem>
    //     <NavbarModals/>
    //   </RightDiv>
    // </Row>;
  }
}
