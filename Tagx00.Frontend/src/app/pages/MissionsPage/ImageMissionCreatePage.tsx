import React from 'react';
import { UserStoreProps } from "../../stores/UserStore";
import { inject, observer } from "mobx-react";
import { STORE_USER } from "../../constants/stores";
import { LocaleMessage, Localize } from "../../internationalization/components";
import { observable } from "mobx";
import { ImageMissionType } from "../../models/mission/image/ImageMission";
import { Form, Input, Icon } from 'antd';
import { ImageMissionCreateInfoForm } from "../../components/MissionCreate/ImageMissionCreateInfoForm";
const FormItem = Form.Item;

interface Props extends UserStoreProps {

}

@inject(STORE_USER)
@observer
export class ImageMissionCreatePage extends React.Component<Props, {}> {

  @observable title: string = "";
  @observable description: string = "";

  @observable imageMissionTypes: ImageMissionType[] = [];

  render() {
    return <div>
      <h1>新增图片任务</h1>

      <ImageMissionCreateInfoForm token={this.props[STORE_USER].user.token}/>
    </div>;
  }
}
