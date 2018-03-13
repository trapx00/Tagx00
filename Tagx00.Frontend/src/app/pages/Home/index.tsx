import * as React from "react";
import { ArticleListDisplay } from "../../components/ArticleListDisplay";
import { LanguageSelector } from "../../components/LanguageSelector";

export class HomePage extends React.Component<any, any> {

  render() {
     return <div>
       <LanguageSelector/>
       <ArticleListDisplay/>
    </div>;
  }
}

