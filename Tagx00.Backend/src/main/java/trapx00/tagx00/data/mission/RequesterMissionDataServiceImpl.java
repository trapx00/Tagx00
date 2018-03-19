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
        Mission[] mission=missionDao.findMissionByusername(username);
        if(mission==null)
            return null;
        MissionRequesterQueryItemVo[] requesterQueryItemVos=new MissionRequesterQueryItemVo[mission.length];
        if(mission!=null)
        {
            for(int i=0;i<mission.length;i++){
                requesterQueryItemVos[i]=new MissionRequesterQueryItemVo(mission[i].getTitle(),mission[i].getDescription(),
                        new MissionVo(mission[i].getMissionType()), mission[i].getMissionState(),mission[i].getCoverUrl());
            }
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
                    instance.getAcceptDate(),instance.getSubmitDate(),instance.getImageIds().size(),instance.getTotalCount());
        }else{
            return null;
        }
    }

    @Override
    public MissionInstanceItemVo[] getInstanceBymissionId(int missionId)
    {
        Instance[] instances=instanceDao.findInstancesBymissionId(missionId);
        if(instances==null)
            return null;
        MissionInstanceItemVo[] missionInstanceItemVos=new MissionInstanceItemVo[instances.length];
        for(int i=0;i<missionInstanceItemVos.length;i++)
            missionInstanceItemVos[i]=new MissionInstanceItemVo(instances[i].getId(),instances[i].getMissionId(),instances[i].getWorkerUsername(),
                    instances[i].getMissionInstanceState(),instances[i].getAcceptDate(),instances[i].getSubmitDate(),instances[i].getImageIds().size(),
                    instances[i].getTotalCount()
                    );
        return missionInstanceItemVos;
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


}
