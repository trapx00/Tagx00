import React from "react";
import { Checkbox } from "antd";
import { FormItem } from "../../../../components/Form/FormItem";

interface Props {
}

export class TextMissionSpecialInfo extends React.Component<Props,{}> {
  render(){
    return <div>
      <FormItem valid={true} messageOnInvalid={""}>
        <Checkbox/>
        <span style={{marginRight: "16px"}}>主题分类（工人在预设主题中选择）</span>
      </FormItem>
      <FormItem valid={true} messageOnInvalid={""}>
        <Checkbox/>
        <span style={{marginRight: "16px"}}>提取主题词（工人可自定义主题词）</span>
      </FormItem>
      <FormItem valid={true} messageOnInvalid={""}>
        <p>上传文本文件zip压缩包</p>
      </FormItem>
    </div>
  }
}