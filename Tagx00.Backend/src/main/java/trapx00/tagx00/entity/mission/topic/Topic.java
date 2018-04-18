package trapx00.tagx00.entity.mission.topic;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;

@Table(name = "topic")
public class Topic extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "topicId")
    private int topicId;

    @Column(name = "value")
    private String value;

    public Topic() {
    }

    public Topic(String value) {
        this.value = value;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
