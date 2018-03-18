package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Instance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import org.springframework.stereotype.Service;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;

@Service
public class RequesterMissionDataServiceImpl implements RequesterMissionDataService {


    private final InstanceDao instanceDao;
    private final MissionDao missionDao;

    @Autowired
    public RequesterMissionDataServiceImpl(InstanceDao instanceDao,MissionDao missionDao) {
        this.instanceDao=instanceDao;
        this.missionDao=missionDao;
    }
    /**
     * save mission
     * @param mission
     */
    @Override
    public int saveMission(Mission mission) throws SystemException {
        Mission result;
        if ((result=missionDao.saveMssion(mission) )== null) {
            throw new SystemException();
        }
        return result.getId();
    }

    /**
     * get missionid by username
     *
     * @param username
     * @return the list of  the MissionRequesterQueryItemVo
     */
    @Override
    public MissionRequesterQueryItemVo[] getMissionByUsername(String username) {
        Mission mission=missionDao.findMissionByusername(username);
        MissionRequesterQueryItemVo[] requesterQueryItemVos=new MissionRequesterQueryItemVo[1];
        if(mission!=null)
        {
            requesterQueryItemVos[0]=new MissionRequesterQueryItemVo(mission.getTitle(),mission.getDescription(),
                    new MissionVo(MissionType.IMAGE), MissionState.ACTIVE,mission.getCoverUrl());
            return requesterQueryItemVos;
        }else{
            return null;
        }
    }

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @return the specific MissionInstanceItemVo
     */
    @Override
    public MissionInstanceItemVo getInstanceById(int instanceId) {
        Instance instance=instanceDao.findInstanceByinstanceId(instanceId);
        if(instance!=null){
            return new MissionInstanceItemVo(instanceId,instance.getMissionId(),instance.getWorkerUsername(),instance.getMissionInstanceState(),
                    instance.getAcceptDate(),instance.getSubmitDate(),0,instance.getImageIds().size());
        }else{
            return null;
        }
    }

    @Override
    public MissionInstanceItemVo getInstanceBymissionId(int missionId) {
        return null;
    }

    /**
     * get all instances of the user by username
     *
     * @param username
     * @return the list of missionIstanceItemVo
     */
    @Override
    public MissionInstanceItemVo[] getInstanceByUsername(String username) {
        Instance instance=instanceDao.findInstanceByusername(username)[0];
        MissionInstanceItemVo[]missionInstanceItemVos=new MissionInstanceItemVo[1];
        if(instance!=null){
            missionInstanceItemVos[0]= new MissionInstanceItemVo(instance.getId(),instance.getMissionId(),instance.getWorkerUsername(),instance.getMissionInstanceState(),
                    instance.getAcceptDate(),instance.getSubmitDate(),0,instance.getImageIds().size());
            return missionInstanceItemVos;
        }else{
            return null;
        }
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
     * get the instance by username and missionId
     *
     * @param username
     * @param missionId
     * @return the instance matching username and missionId
     */
    @Override
    public MissionInstanceItemVo getInstanceByUsernameAndMissionId(String username, int missionId) {
        Instance result;
        Instance[] instances = instanceDao.findInstanceByusername(username);
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
}
