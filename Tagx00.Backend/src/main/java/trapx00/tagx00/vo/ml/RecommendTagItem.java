package trapx00.tagx00.vo.ml;

import trapx00.tagx00.entity.mission.topic.TagConfTuple;

import java.util.List;

public class RecommendTagItem {
    private List<TagConfTuple> tagConfTuples;

    public RecommendTagItem() {
    }

    public RecommendTagItem(List<TagConfTuple> tagConfTuples) {
        this.tagConfTuples = tagConfTuples;
    }

    public List<TagConfTuple> getTagConfTuples() {
        return tagConfTuples;
    }

    public void setTagConfTuples(List<TagConfTuple> tagConfTuples) {
        this.tagConfTuples = tagConfTuples;
    }
}
