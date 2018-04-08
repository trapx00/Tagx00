package trapx00.tagx00.data.daoimpl.mission.topics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.topic.TopicDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.mission.topic.Topic;

import java.util.ArrayList;

@Service
public class TopicDaoImpl implements TopicDao {
    private final FileService<Topic> fileService;

    @Autowired
    public TopicDaoImpl(FileService<Topic> fileService) {
        this.fileService = fileService;
    }

    @Override
    public Topic save(Topic topic) {
        return fileService.saveTuple(topic);
    }

    @Override
    public ArrayList<Topic> findAll() {
        return fileService.findAll(Topic.class);
    }

    @Override
    public Topic findTopicByValue(String value) {
        return fileService.findOne(value, Topic.class);
    }

    @Override
    public void delete(String id) {
        fileService.delete(id, Topic.class);
    }
}
