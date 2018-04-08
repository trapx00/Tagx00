package trapx00.tagx00.blservice.topic;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.topic.TopicFetchResponse;
import trapx00.tagx00.vo.mission.topic.TopicDeleteVo;
import trapx00.tagx00.vo.mission.topic.TopicSaveVo;

public interface TopicBlService {

    /**
     * save topics
     *
     * @param topicSaveVo the topics to be saved
     */
    void saveTopic(TopicSaveVo topicSaveVo) throws SystemException;

    /**
     * get all of the topics
     *
     * @return the array of topics
     */
    TopicFetchResponse getAllTopics();

    /**
     * delete topics
     *
     * @param topicDeleteVo the topics to be deleted
     */
    void deleteTopic(TopicDeleteVo topicDeleteVo);
}
