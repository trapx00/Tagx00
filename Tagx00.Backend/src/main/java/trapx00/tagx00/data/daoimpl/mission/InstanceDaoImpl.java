package trapx00.tagx00.data.daoimpl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.mission.ImageInstance;
import trapx00.tagx00.entity.mission.Instance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.publicdatas.mission.MissionType;

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
    public Instance[] findInstancesByMissionId(int missionId) {

        return fileService.findOnes(String.valueOf(missionId), Instance.class);
    }

    @Override
    public Instance[] findInstancesByWorkerUsername(String workerUsername) {
        return fileService.findOnes(workerUsername, Instance.class);
    }

    @Override
    public Instance findInstanceByInstanceId(int instanceId) {
        return fileService.findOne(String.valueOf(instanceId), Instance.class);
    }

    @Override
    public Instance findInstanceByMissionIdAndWorkerUsername(int missionId, String workerusername) {
        Instance[] intances = fileService.findOnes(String.valueOf(missionId), Instance.class);
        Instance[] instances1 = fileService.findOnes(workerusername, Instance.class);
        Mission temp = fileService1.findOne(String.valueOf(missionId), Mission.class);
        if ((intances == null) && (instances1 == null))
            return null;
        for (int i = 0; i < intances.length; i++) {
            for (int j = 0; j < instances1.length; j++) {
                if (intances[i].getInstanceId() == instances1[j].getInstanceId()) {
                    if (temp.getMissionType().equals(MissionType.IMAGE)) {
                        ImageInstance instanceDetailVo = (ImageInstance) instances1[j];
                        return new ImageInstance(instanceDetailVo.getInstanceId(),
                                instanceDetailVo.getWorkerUsername(), instanceDetailVo.getMissionInstanceState(),
                                instanceDetailVo.getMissionId(), instanceDetailVo.getAcceptDate(), instanceDetailVo.getSubmitDate(),
                                instanceDetailVo.isSubmitted(), instanceDetailVo.getResultIds());
                    }
                }
            }
        }
        return null;
    }

    @Override
    public boolean deleteInstance(int instanceId) {
        fileService.delete(String.valueOf(instanceId), Instance.class);
        return true;
    }
}
