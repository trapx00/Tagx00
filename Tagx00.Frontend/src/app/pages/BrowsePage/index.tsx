import React from "react";
import { BrowserAnimatedContent } from "./BrowserAnimatedContent";
import { SubMenuLayout } from "../../layouts/SubMenuLayout";

export default class BrowsePage extends React.Component<any, any> {
  render() {
    return <SubMenuLayout routes={[]}>
      <BrowserAnimatedContent/>
    </SubMenuLayout>;
  }
}
