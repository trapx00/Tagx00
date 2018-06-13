package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.mission.topic.TagConfTuple;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "missionAsset")
public class MissionAsset {
    @Id
    @Column(name = "url")
    private String url;
    @Column(name = "tagConfTuple")
    @ElementCollection(targetClass = TagConfTuple.class)
    private List<TagConfTuple> tagConfTuple;

    public MissionAsset() {
    }

    public MissionAsset(String url, List<TagConfTuple> tagConfTuple) {
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
