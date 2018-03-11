import { ArticleBrief } from "../../models/Article";
import React from "react";

interface ArticleItemProps {
    article: ArticleBrief;
}

export class ArticleItem extends React.Component<ArticleItemProps, {}> {
    render() {
        return <div>
            <p>{JSON.stringify(this.props.article)}</p>
            </div>;
    }
}