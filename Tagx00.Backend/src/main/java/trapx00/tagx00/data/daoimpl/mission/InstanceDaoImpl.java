package trapx00.tagx00.data.daoimpl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.Mission;

import java.util.ArrayList;

@Service
public class InstanceDaoImpl implements InstanceDao {

    private final FileService<Instance> fileService;
    private final FileService<Mission> fileService1;

    @Autowired
    public InstanceDaoImpl(FileService<Instance> fileService, FileService<Mission> fileService1) {
        this.fileService = fileService;
        this.fileService1 = fileService1;
    }


    @Override
    public Instance saveInstance(Instance instance) {
        return fileService.saveTuple(instance);
    }

    @Override
    public ArrayList<Instance> findInstancesByMissionId(int missionId) {

        return fileService.findOnes(String.valueOf(missionId), Instance.class);
    }

    @Override
    public  ArrayList<Instance> findInstancesByWorkerUsername(String workerUsername) {
        return fileService.findOnes(workerUsername, Instance.class);
    }

    @Override
    public Instance findInstanceByInstanceId(int instanceId) {
        return fileService.findOne(String.valueOf(instanceId), Instance.class);
    }


    @Override
    public boolean deleteInstance(int instanceId) {
        fileService.delete(String.valueOf(instanceId), Instance.class);
        return true;
    }
}
