package trapx00.tagx00.data.mission;

import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.Instance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;
import trapx00.tagx00.vo.mission.worker.MissionWorkerQueryItemVo;

@Service
public class WorkerMissionDataServiceImpl implements WorkerMissionDataService {
    private final InstanceDao instanceDao;
    private final MissionDao missionDao;

    @Autowired
    public WorkerMissionDataServiceImpl(InstanceDao instanceDao,MissionDao missionDao) {
        this.instanceDao=instanceDao;
        this.missionDao=missionDao;
    }
    /**
     * save the progress of the instance.
     * if not accpet the mission before, the system will create a instance for workers
     * also use to abort the instance
     *
     * @param missionInstanceItemVo
     */
    @Override
    public int saveInstance(MissionInstanceItemVo missionInstanceItemVo) throws SystemException {
        Instance result;
        if ((result=instanceDao.saveInstance(new Instance(missionInstanceItemVo.getMissionId(),missionInstanceItemVo.getWorkerUsername(),missionInstanceItemVo.getState(),
                missionInstanceItemVo.getAcceptDate(),missionInstanceItemVo.getSubmitDate(),missionInstanceItemVo.getImageIds()
                ,missionInstanceItemVo.isSubmitted())) )== null) {
            throw new SystemException();
        }
        return result.getId();
    }

    /**
     * get missionid by username
     *
     * @param workerusername
     * @return the list of  the MissionWorkerQueryItemVo
     */
    @Override
    public MissionWorkerQueryItemVo[] getInstanceByWorkerUsername(String workerusername) {
        Instance []instances=instanceDao.findInstanceByWorkerUsername(workerusername);
        if(instances==null)
            return null;
        MissionWorkerQueryItemVo[] requesterQueryItemVos=new MissionWorkerQueryItemVo[instances.length];
        for(int i=0;i<instances.length;i++){
            Mission mission=missionDao.findMissionByMissionId(instances[i].getMissionId());
            requesterQueryItemVos[i]=new MissionWorkerQueryItemVo(mission.getTitle(),mission.getDescription(),
                new MissionVo(mission.getMissionType()), instances[i].getMissionInstanceState(),mission.getCoverUrl(),instances[i].getMissionId());

        }
        return requesterQueryItemVos;

    }
    /**
     * get mission by mission id
     *
     * @param missionId the id of the mission
     * @return the mission object
     */
    @Override
    public Mission getMissionByMissionId(int missionId) {
        Mission mission=missionDao.findMissionByMissionId(missionId);
        return mission;
    }
    /**
     * get the infomation of  instance by username and missionId
     *
     * @param workerusername
     * @param missionId
     * @return the instance matching username and missionId
     */
    @Override
    public MissionInstanceDetailVo getInstanceByUsernameAndMissionId(String workerusername, int missionId) {

        Instance result;
        Instance[] instances = instanceDao.findInstanceByWorkerUsername(workerusername);
        Instance[] instances1 = instanceDao.findInstancesBymissionId(missionId);
        Mission temp = missionDao.findMissionByMissionId(missionId);
        if ((instances == null) && (instances1 == null))
            return null;
        for (int i = 0; i < instances.length; i++) {
            for (int j = 0; j < instances1.length; j++) {
                if (instances[i].getId() == instances1[j].getId()) {
                    result = instances[i];
                    MissionInstanceDetailVo instanceDetailVo = new MissionInstanceDetailVo(result.getId(),missionId, result.getWorkerUsername(),
                            result.getMissionInstanceState(), result.getAcceptDate(), result.getSubmitDate(), result.getImageIds().size(),
                            result.getTotalCount(), temp.getAllowedTags().size() != 0, new MissionVo(temp.getMissionType()));
                    return instanceDetailVo;
                }
            }
        }
        return null;
    }

    @Override
    public boolean deleteInstance(int missionId, String username) {
        MissionInstanceDetailVo instanceDetailVo=this.getInstanceByUsernameAndMissionId(username, missionId) ;
        instanceDao.deleteInstance(instanceDetailVo.getId());
        return true;
    }
}
