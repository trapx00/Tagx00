package trapx00.tagx00.vo.mission.forpublic;

import trapx00.tagx00.entity.mission.topic.TagConfTuple;

import java.util.List;

public class MissionAssetVo {
    private String url;
    private List<TagConfTuple> tagConfTuple;
    private List<TagConfTuple> baiduTagConfTuple;


    public MissionAssetVo(String url, List<TagConfTuple> tagConfTuple, List<TagConfTuple> baiduTagConfTuple) {
        this.url = url;
        this.tagConfTuple = tagConfTuple;
        this.baiduTagConfTuple = baiduTagConfTuple;
    }

    public List<TagConfTuple> getBaiduTagConfTuple() {
        return baiduTagConfTuple;
    }

    public void setBaiduTagConfTuple(List<TagConfTuple> baiduTagConfTuple) {
        this.baiduTagConfTuple = baiduTagConfTuple;
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
