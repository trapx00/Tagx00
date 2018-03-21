package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.ImageInstance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;
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
     * @param instanceVo
     */
    @Override
    public int saveInstance(InstanceVo instanceVo) throws SystemException {
        ImageInstance result;
        if ((result=instanceDao.saveInstance(new ImageInstance(instanceVo.getMissionId(), instanceVo.getWorkerUsername(), instanceVo.getState(),
                instanceVo.getAcceptDate(), instanceVo.getSubmitDate(), instanceVo.getImageIds()
                , instanceVo.isSubmitted())) )== null) {
            throw new SystemException();
        }
        return result.getInstanceId();
    }

    /**
     * get missionid by username
     *
     * @param workerusername
     * @return the list of  the MissionWorkerQueryItemVo
     */
    @Override
    public MissionWorkerQueryItemVo[] getInstanceByWorkerUsername(String workerusername) {
        ImageInstance[] imageInstances =instanceDao.findInstanceByWorkerUsername(workerusername);
        if(imageInstances ==null)
            return null;
        MissionWorkerQueryItemVo[] requesterQueryItemVos=new MissionWorkerQueryItemVo[imageInstances.length];
        for(int i = 0; i< imageInstances.length; i++){
            Mission mission=missionDao.findMissionByMissionId(imageInstances[i].getMissionId());
            requesterQueryItemVos[i]=new MissionWorkerQueryItemVo(mission.getTitle(),mission.getDescription(),
                new MissionProperties(mission.getMissionType()), imageInstances[i].getMissionInstanceState(),mission.getCoverUrl(), imageInstances[i].getMissionId());

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
    public InstanceDetailVo getInstanceByUsernameAndMissionId(String workerusername, int missionId) {

        ImageInstance result;
        ImageInstance[] imageInstances = instanceDao.findInstanceByWorkerUsername(workerusername);
        ImageInstance[] instances1 = instanceDao.findInstancesBymissionId(missionId);
        Mission temp = missionDao.findMissionByMissionId(missionId);
        if ((imageInstances == null) && (instances1 == null))
            return null;
        for (int i = 0; i < imageInstances.length; i++) {
            for (int j = 0; j < instances1.length; j++) {
                if (imageInstances[i].getInstanceId() == instances1[j].getInstanceId()) {
                    result = imageInstances[i];
                    InstanceDetailVo instanceDetailVo = new InstanceDetailVo(result.getInstanceId(),missionId, result.getWorkerUsername(),
                            result.getMissionInstanceState(), result.getAcceptDate(), result.getSubmitDate(), result.getResultIds().size(),
                            result.getTotalCount(), temp.getAllowedTags().size() != 0, new MissionProperties(temp.getMissionType()));
                    return instanceDetailVo;
                }
            }
        }
        return null;
    }

    @Override
    public boolean deleteInstance(int missionId, String username) {
        InstanceDetailVo instanceDetailVo=this.getInstanceByUsernameAndMissionId(username, missionId) ;
        instanceDao.deleteInstance(instanceDetailVo.getInstanceId());
        return true;
    }
}
