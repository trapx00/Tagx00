package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.ImageInstance;
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
public class RequesterMissionDataServiceImpl implements RequesterMissionDataService {


    private final InstanceDao instanceDao;
    private final MissionDao missionDao;

    @Autowired
    public RequesterMissionDataServiceImpl(InstanceDao instanceDao, MissionDao missionDao) {
        this.instanceDao = instanceDao;
        this.missionDao = missionDao;
    }

    /**
     * save mission
     *
     * @param mission
     */
    @Override
    public int saveMission(Mission mission) throws SystemException {
        Mission result;
        if ((result = missionDao.saveMission(mission)) == null) {
            throw new SystemException();
        }
        return result.getMissionId();
    }

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @return the specific MissionInstanceItemVo
     */
    @Override
    public InstanceDetailVo getInstanceByinstanceId(int instanceId) {
        Instance instance = instanceDao.findInstanceByInstanceId(instanceId);
        Mission mission = missionDao.findMissionByMissionId(instance.getMissionId());
        if (instance != null) {
            if (mission.getMissionType().equals(MissionType.IMAGE)) {
                ImageInstance instanceVo = (ImageInstance) instanceDao.findInstanceByInstanceId(instanceId);
                return new ImageInstanceDetailVo(new InstanceVo(instanceId, instance.getWorkerUsername(), instance.getMissionInstanceState(), instance.getMissionId()
                        , instance.getAcceptDate(), instance.getSubmitDate(), instance.isSubmitted(), instanceVo.getResultIds().size()), instanceVo.getResultIds());
            }
        } else
            return null;
        return null;
    }

    @Override
    public InstanceVo[] getInstanceBymissionId(int missionId) {
        ArrayList<Instance> instances = instanceDao.findInstancesByMissionId(missionId);
        if (instances == null)
            return null;
        InstanceVo[] instanceVos = new InstanceVo[instances.size()];
        if (missionDao.findMissionByMissionId(missionId).getMissionType().equals(MissionType.IMAGE))
            for (int i = 0; i < instanceVos.length; i++) {
                ImageInstance instanceVo = (ImageInstance) instances.get(i);
                instanceVos[i] = new ImageInstanceVo(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(),
                        instanceVo.getMissionInstanceState(), instanceVo.getMissionId(),
                        instanceVo.getAcceptDate(), instanceVo.getSubmitDate(), instanceVo.isSubmitted(),
                        instanceVo.getResultIds().size()
                );
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


}
