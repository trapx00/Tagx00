package trapx00.tagx00.vo.ml;

import trapx00.tagx00.entity.mission.topic.TagConfTuple;

import java.util.List;

public class RecommendTagItem {
    private String url;
    private List<TagConfTuple> tagConfTuples;

    public RecommendTagItem() {
    }

    public RecommendTagItem(String url, List<TagConfTuple> tagConfTuples) {
        this.url = url;
        this.tagConfTuples = tagConfTuples;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<TagConfTuple> getTagConfTuples() {
        return tagConfTuples;
    }

    public void setTagConfTuples(List<TagConfTuple> tagConfTuples) {
        this.tagConfTuples = tagConfTuples;
    }
}
