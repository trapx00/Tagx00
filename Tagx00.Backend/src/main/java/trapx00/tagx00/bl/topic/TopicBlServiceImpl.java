package trapx00.tagx00.bl.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.topic.TopicBlService;
import trapx00.tagx00.dataservice.topic.TopicDataService;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.topic.TopicFetchResponse;
import trapx00.tagx00.vo.mission.topic.TopicDeleteVo;
import trapx00.tagx00.vo.mission.topic.TopicSaveVo;

import java.util.ArrayList;

@Service
public class TopicBlServiceImpl implements TopicBlService {
    private final TopicDataService topicDataService;

    @Autowired
    public TopicBlServiceImpl(TopicDataService topicDataService) {
        this.topicDataService = topicDataService;
    }

    /**
     * save topics
     *
     * @param topicSaveVo the topics to be saved
     */
    @Override
    public void saveTopic(TopicSaveVo topicSaveVo) throws SystemException {
        ArrayList<String> toAddTopics = topicSaveVo.getTopics();
        for (String topic : toAddTopics) {
            if (!topicDataService.isTopicExists(topic)) {
                topicDataService.addTopic(topic);
            }
        }
    }

    /**
     * get all of the topics
     *
     * @return the array of topics
     */
    @Override
    public TopicFetchResponse getAllTopics() {
        return new TopicFetchResponse(topicDataService.getAllTopics());
    }

    /**
     * delete topics
     *
     * @param topicDeleteVo the topics to be deleted
     */
    @Override
    public void deleteTopic(TopicDeleteVo topicDeleteVo) {
        topicDataService.deleteTopics(topicDeleteVo.getTopicIds());
    }
}
