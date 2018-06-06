package trapx00.tagx00.entity.mission.topic;

import javax.persistence.Embeddable;

@Embeddable
public class TagConfTuple {
    private String tag;
    private double confidence;

    public TagConfTuple() {
    }

    public TagConfTuple(String tag, double confidence) {
        this.tag = tag;
        this.confidence = confidence;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public double getConfidence() {
        return confidence;
    }

    public void setConfidence(double confidence) {
        this.confidence = confidence;
    }
}
