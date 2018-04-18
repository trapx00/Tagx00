package trapx00.tagx00.data.topic;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.data.dao.mission.topic.TopicDao;
import trapx00.tagx00.dataservice.topic.TopicDataService;
import trapx00.tagx00.entity.mission.topic.Topic;
import trapx00.tagx00.exception.viewexception.SystemException;

import java.util.ArrayList;
import java.util.List;

public class TopicDataServiceImpl implements TopicDataService {
    private final TopicDao topicDao;

    @Autowired
    public TopicDataServiceImpl(TopicDao topicDao) {
        this.topicDao = topicDao;
    }

    /**
     * does the topic exist
     *
     * @param topic the topic
     * @return whether the topic exists
     */
    @Override
    public boolean isTopicExists(String topic) {
        return topicDao.findTopicByValue(topic) != null;
    }

    /**
     * save topics
     *
     * @param topic the topics to be saved
     */
    @Override
    public void addTopic(String topic) throws SystemException {
        if (topicDao.save(new Topic(topic)) == null) {
            throw new SystemException();
        }
    }

    /**
     * find all of the topics
     *
     * @return the list of the topics
     */
    @Override
    public List<Topic> getAllTopics() {
        return topicDao.findAll();
    }

    /**
     * delete topics
     *
     * @param topics the list of the topics
     */
    @Override
    public void deleteTopics(ArrayList<Integer> topics) {
        for (int topicId : topics) {
            topicDao.delete(topicId);
        }
    }
}
