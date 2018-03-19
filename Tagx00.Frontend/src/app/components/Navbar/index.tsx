import React from "react";
import { Menu} from 'antd';
import { SvgImg } from "../Common/SvgImg";
import { aboutPage, browsePage, homePage } from "../../routes/routes";
import { LocaleMessage } from "../../internationalization/components";
import { inject, observer } from "mobx-react";
import { STORE_ROUTER } from "../../constants/stores";
import { RouterStoreProps } from "../../routes/RouterStore";

@inject(STORE_ROUTER)
@observer
export class Navbar extends React.Component<RouterStoreProps, any> {
  render() {
    const router = this.props[STORE_ROUTER];

    const selectedRoute = router.currentPage.id;

    return <div>
        {/*<span>*/}
          {/*<SvgImg filePath={"logo.svg"} width={56} height={56}/>*/}
        {/*</span>*/}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedRoute]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key={homePage.id}>
          <a onClick={() => router.jumpTo(homePage.path)}>
            <LocaleMessage id={"navbar.home"}/>
          </a>
        </Menu.Item>
        <Menu.Item key={browsePage.id}>
          <a onClick={() => router.jumpTo(browsePage.path)}>
            <LocaleMessage id={"navbar.browse"}/>
          </a>
        </Menu.Item>
        <Menu.Item key={aboutPage.id}>
          <a onClick={() => router.jumpTo(aboutPage.path)}>
          <LocaleMessage id={"navbar.about"}/>
          </a>
        </Menu.Item>
      </Menu>
    </div>;
  }
}
