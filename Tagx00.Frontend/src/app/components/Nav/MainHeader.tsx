import React from 'react';
import { Layout, Icon as AntdIcon, Menu, Popover } from 'antd';
import { Inject } from "react.di";
import { CONTENT_SIDE_PADDING, UiStore } from "../../stores/UiStore";
import { action } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import { LanguageSelector } from "../LanguageSelector";
import { UserIndicator } from "./NavbarUserIndicator/UserIndicator";
import { NavStore } from "../../stores/NavStore";
import { TopNav } from "./TopNav";
import { DropdownContainer, LeftDiv, MobileNavContainer, NavItem, RightDiv, Row, SvgImgContainer } from "./Layout";
import { SvgImg } from "../Common/SvgImg";
import { NavbarUserIndicator } from "./NavbarUserIndicator";
import { NavbarModals } from "./NavbarModals";

const AntdHeader = Layout.Header;

interface Props {

}

interface PaddingProps {
  padding: number;
}

const Header = styled(AntdHeader)`
  padding: 0 ${(props: PaddingProps) => props.padding}px 0 ${(props: PaddingProps) => props.padding}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
`;

const Container = styled.div`
  & > * {
  margin-left: 16px;
  }
  display: flex;
  
`;

const Icon = styled(AntdIcon)`
margin-left: 4px;
  &:hover {
  cursor:pointer;
  }

`;


@observer
export class MainHeader extends React.Component<Props, {}> {

  @Inject uiStore: UiStore;
  @Inject navStore: NavStore;

  dropdownContainerRef = React.createRef() as any;

  @action toggle = () => {
    this.navStore.navMenuShown = !this.navStore.navMenuShown;
  };

  render() {

    return <Row>
      <LeftDiv>
        <Icon
          type={this.navStore.navMenuShown ? 'menu-fold' : 'menu-unfold'}
          onClick={this.toggle}
        />
        <MobileNavContainer>
          <NavbarUserIndicator/>
          <LanguageSelector/>
          <DropdownContainer innerRef={this.dropdownContainerRef}>
            <Popover getPopupContainer={() => this.dropdownContainerRef.current} trigger={"click"}
                     placement={"bottomRight"} content={
              <TopNav dropdownMode={true} routes={this.navStore.currentSubNavs}/>
            }>
              <AntdIcon type="menu-fold"/>
            </Popover>
          </DropdownContainer>
        </MobileNavContainer>
      </LeftDiv>
      <RightDiv>
        <NavItem>
          <LanguageSelector/>
        </NavItem>
        <NavItem>
          <NavbarUserIndicator/>
        </NavItem>
        <NavItem>
          <TopNav dropdownMode={false} routes={this.navStore.currentSubNavs}/>
        </NavItem>
        <NavbarModals/>
      </RightDiv>
    </Row>;

    // return <Header padding={this.uiStore.contentSidePadding}>
    //   <Container>
    //     <div>
    //
    //     </div>
    //     <div>
    //
    //     </div>
    //   </Container>
    //   <Container>
    //     <UserIndicator/>
    //     <LanguageSelector/>
    //   </Container>
    // </Header>
  }
}
