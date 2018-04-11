package trapx00.tagx00.vo.mission.topic;

import java.io.Serializable;
import java.util.ArrayList;

public class TopicSaveVo implements Serializable {
    ArrayList<String> topics;

    public TopicSaveVo() {
    }

    public TopicSaveVo(ArrayList<String> topics) {
        this.topics = topics;
    }

    public ArrayList<String> getTopics() {
        return topics;
    }

    public void setTopics(ArrayList<String> topics) {
        this.topics = topics;
    }
}
