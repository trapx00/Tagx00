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
    public Instance saveInstance(Instance instance) {
        return fileService.saveTuple(instance);
    }

    @Override
    public Instance[] findInstancesBymissionId(int missionId) {

        return  fileService.findOnes(String.valueOf(missionId),Instance.class);
    }

    @Override
    public Instance[] findInstanceByWorkerUsername(String workerusername) {

        return fileService.findOnes(workerusername,Instance.class);
    }

    @Override
    public Instance findInstanceByinstanceId(int instanceId) {
        return fileService.findOne(String.valueOf(instanceId), Instance.class);
    }

    @Override
    public boolean deleteInstance(int instanceid) {
        fileService.delete(String.valueOf(instanceid),Instance.class);
        return true;
    }
}
