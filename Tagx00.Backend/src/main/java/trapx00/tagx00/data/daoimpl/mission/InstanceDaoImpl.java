package trapx00.tagx00.data.daoimpl.mission;

import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.mission.Instance;

public class InstanceDaoImpl implements InstanceDao {

    private final FileService<Instance> fileService;

    @Autowired
    public InstanceDaoImpl(FileService<Instance> fileService) {
        this.fileService = fileService;
    }


    @Override
    public Instance[] findInstancesBymissionId(int missionId) {
        Instance[]result=new Instance[1];
        result[0]=fileService.findOne(String.valueOf(missionId),Instance.class);
        return result;
    }

    @Override
    public Instance[] findInstanceByusername(String username) {
        Instance[]result=new Instance[1];
        result[0]=fileService.findOne(String.valueOf(username),Instance.class);
        return result;
    }

    @Override
    public Instance findInstanceByinstanceId(int instanceId) {
        return fileService.findOne(String.valueOf(instanceId), Instance.class);
    }

    @Override
    public Instance findInstanceByUsernameAndmissionId(String username, int missionId) {
        return null;
    }
}
