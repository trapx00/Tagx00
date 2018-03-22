package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.Instance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.ArrayList;

@Service
public class WorkerMissionDataServiceImpl implements WorkerMissionDataService {
    private final InstanceDao instanceDao;
    private final MissionDao missionDao;

    @Autowired
    public WorkerMissionDataServiceImpl(InstanceDao instanceDao, MissionDao missionDao) {
        this.instanceDao = instanceDao;
        this.missionDao = missionDao;
    }

    /**
     * save the progress of the instance.
     * if not accpet the mission before, the system will create a instance for workers
     * also use to abort the instance
     *
     * @param instanceVo
     */
    @Override
    public int saveInstance(InstanceDetailVo instanceVo) throws SystemException {
        Instance result = null;

        if (missionDao.findMissionByMissionId(instanceVo.getInstance().getMissionId()).
                getMissionType().equals(MissionType.IMAGE)) {
            ImageInstanceDetailVo instanceDetailVo = (ImageInstanceDetailVo) instanceVo;
            if (instanceDao.findInstanceByMissionIdAndWorkerUsername(instanceVo.getInstance().getMissionId(),
                    instanceVo.getInstance().getWorkerUsername()) == null) {
                instanceDao.saveInstance(new ImageInstance( instanceVo.getInstance().getWorkerUsername(),
                        instanceVo.getInstance().getMissionInstanceState(), instanceVo.getInstance().getMissionId(),
                        instanceVo.getInstance().getAcceptDate(), instanceVo.getInstance().getSubmitDate(),
                        instanceVo.getInstance().isSubmitted(), instanceDetailVo.getImageIds()
                ));
            } else {
                ImageInstance instance=new ImageInstance(instanceVo.getInstance().getWorkerUsername(), instanceVo.getInstance().getMissionInstanceState(),
                        instanceVo.getInstance().getMissionId(), instanceVo.getInstance().getAcceptDate(),
                        instanceVo.getInstance().getSubmitDate(), instanceVo.getInstance().isSubmitted()
                        , instanceDetailVo.getImageIds());
                instance.setInstanceId(instanceVo.getInstance().getInstanceId());
                result = instanceDao.saveInstance(instance);
                if(result==null)
                    throw new SystemException();
            }
        }

        return result.getInstanceId();
    }

    /**
     * get missionid by username
     *
     * @param workerUsername
     * @return the list of  the MissionWorkerQueryItemVo
     */
    @Override
    public InstanceVo[] getInstanceByWorkerUsername(String workerUsername) {
        ArrayList<Instance> instances = instanceDao.findInstancesByWorkerUsername(workerUsername);
        if (instances == null)
            return null;
        InstanceVo[] instanceVos = new InstanceVo[instances.size()];
        for (int i = 0; i < instances.size(); i++) {
            Mission mission = missionDao.findMissionByMissionId(instances.get(i).getMissionId());
            if (mission.getMissionType().equals(MissionType.IMAGE)) {
                ImageInstance instance = (ImageInstance) instances.get(i);
                instanceVos[i] = new ImageInstanceVo(instance.getInstanceId(),instance.getWorkerUsername(), instance.getMissionInstanceState(),
                        instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
                        instance.isSubmitted(), instance.getResultIds().size());
            }
        }
        return instanceVos;

    }

    /**
     * get mission by mission id
     *
     * @param missionId the id of the mission
     * @return the mission object
     */
    @Override
    public Mission getMissionByMissionId(int missionId) {
        Mission mission = missionDao.findMissionByMissionId(missionId);
        return mission;
    }

    /**
     * get the infomation of  instance by username and missionId
     *
     * @param workerUsername
     * @param missionId
     * @return the instance matching username and missionId
     */
    @Override
    public InstanceDetailVo getInstanceByUsernameAndMissionId(String workerUsername, int missionId) {

        ArrayList<Instance> instances = instanceDao.findInstancesByWorkerUsername(workerUsername);
        ArrayList<Instance> instances1 = instanceDao.findInstancesByMissionId(missionId);
        Mission temp = missionDao.findMissionByMissionId(missionId);
        if ((instances == null) && (instances1 == null))
            return null;
        for (int i = 0; i < instances.size(); i++) {
            for (int j = 0; j < instances1.size(); j++) {
                if (instances.get(i).getInstanceId() == instances1.get(j).getInstanceId()) {
                    if (temp.getMissionType().equals(MissionType.IMAGE)) {
                        ImageInstance instanceDetailVo = (ImageInstance) instances1.get(j);
                        return new ImageInstanceDetailVo(new InstanceVo(instanceDetailVo.getInstanceId(),
                                instanceDetailVo.getWorkerUsername(), instanceDetailVo.getMissionInstanceState(),
                                instanceDetailVo.getMissionId(), instanceDetailVo.getAcceptDate(), instanceDetailVo.getSubmitDate(),
                                instanceDetailVo.isSubmitted(), instanceDetailVo.getResultIds().size()), instanceDetailVo.getResultIds());
                    }
                }
            }
        }
        return null;
    }

    @Override
    public boolean deleteInstance(int missionId, String username) {
        InstanceDetailVo instanceDetailVo = this.getInstanceByUsernameAndMissionId(username, missionId);
        instanceDao.deleteInstance(instanceDetailVo.getInstance().getInstanceId());
        return true;
    }
}
