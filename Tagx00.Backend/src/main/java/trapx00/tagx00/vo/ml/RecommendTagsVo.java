package trapx00.tagx00.vo.ml;

import java.util.List;

public class RecommendTagsVo {
    private List<RecommendTagItem> recommendTagItemList;

    public RecommendTagsVo() {
    }

    public RecommendTagsVo(List<RecommendTagItem> recommendTagItemList) {
        this.recommendTagItemList = recommendTagItemList;
    }

    public List<RecommendTagItem> getRecommendTagItemList() {
        return recommendTagItemList;
    }

    public void setRecommendTagItemList(List<RecommendTagItem> recommendTagItemList) {
        this.recommendTagItemList = recommendTagItemList;
    }
}
