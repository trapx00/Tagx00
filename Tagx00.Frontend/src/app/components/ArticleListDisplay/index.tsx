import React from "react";
import { observer } from "mobx-react";
import { ArticleBrief } from "../../models/Article";
import { ArticleListService } from "../../api/ArticleListService";
import { action, observable, runInAction } from "mobx";
import { ArticleItem } from "./ArticleItem";
import { LocaleMessage } from "../../internationalization";
import { Button } from 'antd';


enum FetchStatus {
    NotStarted, Fetching, Fetched
}

const service = new ArticleListService();

@observer
export class ArticleListDisplay extends React.Component<any, {}> {

    @observable status: FetchStatus = FetchStatus.NotStarted;


    list: ArticleBrief[];

    @action fetch = async () => {
        this.status = FetchStatus.Fetching;
        const list = await service.getAllArticles();
        runInAction(() => {
            this.list = list;
            this.status = FetchStatus.Fetched;
        })
    }

    render() {
        switch (this.status) {
            case FetchStatus.NotStarted:
                return <Button onClick={this.fetch}>
                <LocaleMessage id={"articleList.clickToLoad"}/>
                </Button>;
            case FetchStatus.Fetching:
                return <p><LocaleMessage id={"articleList.loading"}/></p>;
        }

        // fetched
        return <div>
            {this.list.map(x => <ArticleItem key={x.id} article={x}/>)}
            </div>;
    }
}