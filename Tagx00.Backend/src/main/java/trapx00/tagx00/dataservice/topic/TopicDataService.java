package trapx00.tagx00.dataservice.topic;

import trapx00.tagx00.entity.mission.topic.Topic;
import trapx00.tagx00.exception.viewexception.SystemException;

import java.util.ArrayList;
import java.util.List;

public interface TopicDataService {

    /**
     * does the topic exist
     *
     * @param topic the topic
     * @return whether the topic exists
     */
    boolean isTopicExists(String topic);

    /**
     * add topics
     *
     * @param topic the topics to be saved
     * @return the saved topics
     */
    void addTopic(String topic) throws SystemException;

    /**
     * find all of the topics
     *
     * @return the list of the topics
     */
    List<Topic> getAllTopics();

    /**
     * delete topics
     *
     * @param topics the list of the topics
     */
    void deleteTopics(ArrayList<Integer> topics);
}
