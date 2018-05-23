import React from "react";
import { Icon, Menu } from 'antd';
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import img from '../../../../assets/logo.png';
import { LogoContainer } from "../Layout";
import { RouterStore } from "../../../stores/RouterStore";
import { NavItemProps, NavStore } from "../../../stores/NavStore";
import { navRoutes, NOT_LOGIN_FLAG, submenuMap } from "./SubMenus";
import { LocaleMessage } from "../../../internationalization/components";
import { UserStore } from "../../../stores/UserStore";
import { computed } from "mobx";

const {SubMenu} = Menu;

// import pages will result in circular dependency and I can't figure out why
// hard-code is the only option :(


function LogoItem(props: {}) {
  return <Link to={"/"}>
    <LogoContainer>
      <img src={img}/>
      <span>Tag x00</span>
    </LogoContainer>
  </Link>;
}

@observer
export class MainNav extends React.Component<{}, {}> {

  @Inject routerStore: RouterStore;
  @Inject navStore: NavStore;
  @Inject userStore: UserStore;

  @computed get currentSubMenuMap() {
    return submenuMap[this.userStore.loggedIn ? this.userStore.user.role : NOT_LOGIN_FLAG];
  }

  get selectedRoute() {
    let selected = Object.keys(navRoutes)
      .map(x => navRoutes[x])
      .filter(x => x.match(this.routerStore.path))
      .map(x => x.path);
    Object.keys(this.currentSubMenuMap).map(x => this.currentSubMenuMap[x])
      .map(x => x.filter(y => y.match(this.routerStore.path)).map(x => x.path))
      .forEach(x => {
        selected = selected.concat(x)
      });
    console.log(selected);
    return selected;
  }

  jumpTo = (path: string) => {
    this.routerStore.jumpTo(path);
  };

  render() {
    return <div>
      <LogoItem/>
      <Menu
        theme="dark"
        mode={"inline"}
        selectedKeys={this.selectedRoute}
      >
        {Object.keys(navRoutes)
          .map(x => {
              const root = navRoutes[x];
              console.log(submenuMap);
              const subs: NavItemProps[] = this.currentSubMenuMap[x];
              if (!subs || subs.length == 0) {
                return <Menu.Item key={root.path}>
                  <Icon type={root.iconName}/>
                  <span onClick={() => this.jumpTo(root.path)}>
            <LocaleMessage id={root.id}/>
          </span>
                </Menu.Item>
              } else {
                return <SubMenu key={root.path} title={
                  <span>
                  <Icon type={root.iconName}/>
                  <span><LocaleMessage id={root.id}/></span>
                </span>}

                >
                  {subs.map(sub =>
                    <Menu.Item key={sub.path}>
                      <Icon type={sub.iconName}/>
                      <span onClick={() => this.jumpTo(sub.path)}>
                      <LocaleMessage id={sub.id}/>
                      </span>
                    </Menu.Item>
                  )}
                </SubMenu>;
              }

            }
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
