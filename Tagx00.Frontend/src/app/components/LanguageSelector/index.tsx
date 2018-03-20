import { inject, observer } from "mobx-react";
import { STORE_LOCALE } from "../../constants/stores";
import * as React from "react";
import { CSSProperties } from "react";
import { LocaleMessage } from "../../internationalization";
import { action, observable, runInAction } from "mobx";
import { Menu, Dropdown, Icon } from 'antd';
import { LocaleStoreProps } from "../../internationalization/LocaleStore";

interface LanguageSelectorProps extends LocaleStoreProps {

}

interface LanguageSelectorItemProps extends LocaleStoreProps {

}


@inject(STORE_LOCALE)
@observer
export class LanguageSelector extends React.Component<LanguageSelectorProps, any> {
  @observable switchingToId: string = "";

  constructMenu() {
    const items = this.constructChildren();
    return <Menu>
      {items}
    </Menu>;
  }
  languageOnClickProducer = (id: string) => action(async () => {
    const locale = this.props[STORE_LOCALE];
    this.switchingToId = id;
    await locale.changeLanguage(id);
    runInAction(() => {
      this.switchingToId = "";
    });

  });

  constructChildren() {
    const locale = this.props[STORE_LOCALE];
    return locale.allLanguages.filter(x => x.id !== locale.currentLanguage.id).map(x =>
      <Menu.Item key={x.id}>
        <a onClick={this.languageOnClickProducer(x.id)}>
          {x.name}
          {this.switchingToId == x.id ? <LocaleMessage id={"languageSelector.loading"}/> : null}
        </a>

      </Menu.Item>
    );
  }

  render() {
    const locale = this.props[STORE_LOCALE];

    return <Dropdown overlay={this.constructMenu()}>
      <a className="ant-dropdown-link" href="#">
        {locale.currentLanguage.name} <Icon type="down" />
      </a>
    </Dropdown>
;
  }
}
