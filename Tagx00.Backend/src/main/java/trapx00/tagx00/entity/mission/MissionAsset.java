package trapx00.tagx00.entity.mission;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import java.util.HashMap;
import java.util.Map;

@Embeddable
public class MissionAsset {
    @Column(name = "url")
    private String url;
    @Embedded
    private Map<String, Double> tagConfTuple;

    public MissionAsset() {
    }

    public MissionAsset(String url, Map<String, Double> tagConfTuple) {
        this.url = url;
        this.tagConfTuple = tagConfTuple;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Map<String, Double> getTagConfTuple() {
        return tagConfTuple;
    }

    public void setTagConfTuple(Map<String, Double> tagConfTuple) {
        this.tagConfTuple = tagConfTuple;
    }
}
