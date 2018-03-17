import * as React from "react";
import { ArticleListDisplay } from "../../components/ArticleListDisplay";
import { LanguageSelector } from "../../components/LanguageSelector";
import {PartTagPanel} from "../../components/DrawingPad/PartTagPanel/index";
import { DistrictTagPanel } from "../../components/DrawingPad/DistrictTagPanel";

export class HomePage extends React.Component<any, any> {

  render() {
     return <div>
       <DistrictTagPanel imageUrl={"https://www.google.ru/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png"}/>
    </div>;
  }
}

