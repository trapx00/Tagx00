import * as React from "react";
import { ArticleListDisplay } from "../../components/ArticleListDisplay";
import { LanguageSelector } from "../../components/LanguageSelector";
import { DistrictPanel } from "../../components/DrawingPad/DistrictPanel";
import { RectangleCanvasContainer } from "../../components/DrawingPad/RectanglePanel/RectangleCanvasContainer";

export class HomePage extends React.Component<any, any> {

  render() {
     return <div>
       <DistrictPanel imageUrl={"https://cdn.pixabay.com/photo/2017/12/03/17/23/fantasy-2995326__340.jpg"}/>
    </div>;
  }
}

