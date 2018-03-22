package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.ImageInstance;
import trapx00.tagx00.entity.mission.Instance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

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
    public int saveInstance(InstanceDetailVo instanceVo) throws SystemException {
         Instance result=null;

         if(missionDao.findMissionBymissionId(instanceVo.getInstance().getMissionId()).
                 getMissionType().equals(MissionType.IMAGE)){
             ImageInstanceDetailVo instanceDetailVo=(ImageInstanceDetailVo)instanceVo;
             if(instanceDao.findInstanceBymissionIdandworkerUsername(instanceVo.getInstance().getMissionId(),
                     instanceVo.getInstance().getWorkerUsername())==null){
                 instanceDao.saveInstance(new ImageInstance(instanceVo.getInstance().getInstanceId(),instanceVo.getInstance().getWorkerUsername(),
                         instanceVo.getInstance().getMissionInstanceState(),instanceVo.getInstance().getMissionId(),
                         instanceVo.getInstance().getAcceptDate(),instanceVo.getInstance().getSubmitDate(),
                         instanceVo.getInstance().isSubmitted(),instanceDetailVo.getImageIds()
                         ));
             }
             else if ((result=instanceDao.saveInstance(new ImageInstance(instanceVo.getInstance().getInstanceId()
                     , instanceVo.getInstance().getWorkerUsername(), instanceVo.getInstance().getMissionInstanceState(),
                     instanceVo.getInstance().getMissionId(), instanceVo.getInstance().getAcceptDate(),
                     instanceVo.getInstance().getSubmitDate(),instanceVo.getInstance().isSubmitted()
                     ,instanceDetailVo.getImageIds() )) )== null) {
                 throw new SystemException();
             }
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
    public InstanceVo[] getInstanceByWorkerUsername(String workerusername) {
        Instance[] instances =instanceDao.findInstanceByworkerUsername(workerusername);
        if(instances ==null)
            return null;
        InstanceVo[] instanceVos=new InstanceVo[instances.length];
        for(int i = 0; i< instances.length; i++){
            Mission mission=missionDao.findMissionBymissionId(instances[i].getMissionId());
            if(mission.getMissionType().equals(MissionType.IMAGE)){
                ImageInstance instance=(ImageInstance)instances[i];
                instanceVos[i]=new ImageInstanceVo(instances[i].getInstanceId(),instances[i].getWorkerUsername(),instances[i].getMissionInstanceState(),
                        instances[i].getMissionId(),instances[i].getAcceptDate(),instances[i].getSubmitDate(),
                        instances[i].isSubmitted(),instance.getResultIds().size());
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
        Mission mission=missionDao.findMissionBymissionId(missionId);
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
        
        Instance[] intances = instanceDao.findInstanceByworkerUsername(workerusername);
        Instance[] instances1 = instanceDao.findInstanceBymissionId(missionId);
        Mission temp = missionDao.findMissionBymissionId(missionId);
        if ((intances == null) && (instances1 == null))
                return null;
            for (int i = 0; i < intances.length; i++) {
                for (int j = 0; j < instances1.length; j++) {
                    if (intances[i].getInstanceId() == instances1[j].getInstanceId()) {
                        if(temp.getMissionType().equals(MissionType.IMAGE)){
                            ImageInstance instanceDetailVo=(ImageInstance) instances1[j];
                            return new ImageInstanceDetailVo(new InstanceVo(instanceDetailVo.getInstanceId(),
                                    instanceDetailVo.getWorkerUsername(),instanceDetailVo.getMissionInstanceState(),
                                    instanceDetailVo.getMissionId(),instanceDetailVo.getAcceptDate(),instanceDetailVo.getSubmitDate(),
                                    instanceDetailVo.isSubmitted(),instanceDetailVo.getResultIds().size()),instanceDetailVo.getResultIds());
                        }
                    }
                }
        }
        return null;
    }

    @Override
    public boolean deleteInstance(int missionId, String username) {
        InstanceDetailVo instanceDetailVo=this.getInstanceByUsernameAndMissionId(username, missionId) ;
        instanceDao.deleteInstance(instanceDetailVo.getInstance().getInstanceId());
        return true;
    }
}
