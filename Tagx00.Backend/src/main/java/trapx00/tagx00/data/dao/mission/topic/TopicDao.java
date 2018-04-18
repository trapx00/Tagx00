package trapx00.tagx00.data.dao.mission.topic;

import trapx00.tagx00.entity.mission.topic.Topic;

import java.util.ArrayList;

public interface TopicDao {
    Topic save(Topic topics);

    ArrayList<Topic> findAll();

    Topic findTopicByValue(String value);

    void delete(int id);
}
