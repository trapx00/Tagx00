package trapx00.tagx00.vo.mission.forpublic;

import trapx00.tagx00.entity.mission.topic.TagConfTuple;

import java.util.List;

public class MissionAssetVo {
    private String url;
    private List<TagConfTuple> tagConfTuple;

    public MissionAssetVo() {
    }

    public MissionAssetVo(String url, List<TagConfTuple> tagConfTuple) {
        this.url = url;
        this.tagConfTuple = tagConfTuple;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<TagConfTuple> getTagConfTuple() {
        return tagConfTuple;
    }

    public void setTagConfTuple(List<TagConfTuple> tagConfTuple) {
        this.tagConfTuple = tagConfTuple;
    }
}
