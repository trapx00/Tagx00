package trapx00.tagx00.response.topic;

import trapx00.tagx00.entity.mission.topic.Topic;
import trapx00.tagx00.response.Response;

import java.util.List;

public class TopicFetchResponse extends Response {
    private List<Topic> topics;

    public TopicFetchResponse() {
    }

    public TopicFetchResponse(List<Topic> topics) {
        this.topics = topics;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }
}
