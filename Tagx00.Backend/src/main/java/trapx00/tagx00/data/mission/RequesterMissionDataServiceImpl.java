package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.ImageInstance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import org.springframework.stereotype.Service;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

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
        return result.getMissionId();
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
                        new MissionProperties(mission[i].getMissionType()), mission[i].getMissionState(),mission[i].getCoverUrl());
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
    public InstanceVo getInstanceById(int instanceId) {
        ImageInstance imageInstance =instanceDao.findInstanceByinstanceId(instanceId);
        if(imageInstance !=null){
            return new InstanceVo(instanceId, imageInstance.getMissionId(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(),
                    imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.getResultIds().size(), imageInstance.getTotalCount());
        }else{
            return null;
        }
    }

    @Override
    public InstanceVo[] getInstanceBymissionId(int missionId)
    {
        ImageInstance[] imageInstances =instanceDao.findInstancesBymissionId(missionId);
        if(imageInstances ==null)
            return null;
        InstanceVo[] instanceVos =new InstanceVo[imageInstances.length];
        for(int i = 0; i< instanceVos.length; i++)
            instanceVos[i]=new InstanceVo(imageInstances[i].getInstanceId(), imageInstances[i].getMissionId(), imageInstances[i].getWorkerUsername(),
                    imageInstances[i].getMissionInstanceState(), imageInstances[i].getAcceptDate(), imageInstances[i].getSubmitDate(), imageInstances[i].getResultIds().size(),
                    imageInstances[i].getTotalCount()
                    );
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
        Mission mission=missionDao.findMissionByMissionId(missionId);
        return mission;
    }


}
