import { toJS } from "mobx";
import React from "react";
import {  Checkbox } from "antd";
import { ImageMissionType } from "../../../../models/mission/image/ImageMission";
import { ImageMissionCreateInfo } from "./ImageMissionCreateInfoForm/ImageMissionCreateInfo";
import { FormItem } from "../../../../components/Form/FormItem";
import { TagSelector } from "../../../../components/TagSelector";
import { ImageUploadPanel } from "./ImageMissionCreateInfoForm/ImageUploadPanel";

const CheckboxGroup = Checkbox.Group;

interface Props {
  info:ImageMissionCreateInfo,
  locale:any,
  onAllowCustomTagChanged:(e)=>void,
  onTagsChange:(e)=>void,
  onTypeChange:(e)=>void,
  onFileListChange:(e)=>void,
}

export class ImageMissionSpecialInfo extends React.Component<Props,{}> {
  render() {
    const props = this.props;
    const locale = this.props.locale;
    return <div>
      <FormItem valid={props.info.allowedTagsValid} messageOnInvalid={locale.requireTags}>
        <span style={{marginRight: "16px"}}>{locale.tags}</span>
        <Checkbox checked={props.info.allowCustomTag} onChange={props.onAllowCustomTagChanged}>
          {locale.allowCustomTag}
        </Checkbox>
        <TagSelector onSelectedChanged={props.onTagsChange}
                     selectedTags={toJS(props.info.allowedTags)}
                     placeholder={locale.tags}
        />
      </FormItem>
      <FormItem valid={props.info.imageTypesValid} messageOnInvalid={locale["IMAGE.requireTypes"]}>
        <p>{locale["IMAGE.types.name"]}</p>
        <CheckboxGroup options={Object.keys(ImageMissionType).map(x => ({label: locale[`IMAGE.types.${x}`], value: x}))}
                       value={toJS(props.info.imageMissionTypes)}
                       onChange={props.onTypeChange}/>
      </FormItem>
      <FormItem valid={props.info.imagesValid} messageOnInvalid={locale["IMAGE.requireImages"]}>
        <p>{locale["IMAGE.images"]}</p>
        <ImageUploadPanel onFileListChange={props.onFileListChange}
                          fileList={props.info.images}
                          maxFileNum={Number.MAX_SAFE_INTEGER}
                          multiple={true}
                          buttonChildren={locale.selectFile}
        />
      </FormItem>
    </div>
  }

}