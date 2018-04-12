package trapx00.tagx00.vo.mission.topic;

import java.io.Serializable;
import java.util.ArrayList;

public class TopicDeleteVo implements Serializable {
    ArrayList<Integer> topicIds;

    public TopicDeleteVo() {
    }

    public TopicDeleteVo(ArrayList<Integer> topicIds) {
        this.topicIds = topicIds;
    }

    public ArrayList<Integer> getTopicIds() {
        return topicIds;
    }

    public void setTopicIds(ArrayList<Integer> topicIds) {
        this.topicIds = topicIds;
    }
}
