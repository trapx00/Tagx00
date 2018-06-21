package trapx00.tagx00.vo.ml;

import java.util.List;

public class RecommendRequestVo {
    private List<RecommendTagItem> recommendTagItemList;
    private List<RecommendTagItem> baiduResults;

    public RecommendRequestVo(List<RecommendTagItem> recommendTagItemList, List<RecommendTagItem> baiduResults) {
        this.recommendTagItemList = recommendTagItemList;
        this.baiduResults = baiduResults;
    }

    public List<RecommendTagItem> getRecommendTagItemList() {
        return recommendTagItemList;
    }

    public void setRecommendTagItemList(List<RecommendTagItem> recommendTagItemList) {
        this.recommendTagItemList = recommendTagItemList;
    }

    public List<RecommendTagItem> getBaiduResults() {
        return baiduResults;
    }

    public void setBaiduResults(List<RecommendTagItem> baiduResults) {
        this.baiduResults = baiduResults;
    }
}
