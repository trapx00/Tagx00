package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;
import trapx00.tagx00.vo.mission.worker.MissionWorkerQueryItemVo;

public interface WorkerMissionDataService {
    /**
     * get mission by mission id
     *
     * @param missionId the id of the mission
     * @return the mission object
     */
    Mission getMissionByMissionId(int missionId);
    /**
     * save the progress of the instance.
     * if not accpet the mission before, the system will create a instance for workers
     * also use to abort the instance
     * @param missionInstanceItemVo
     */
    int saveInstance(MissionInstanceItemVo missionInstanceItemVo)throws SystemException;


    /**
     * get missionid by username
     * @param username
     * @return the list of  the MissionWorkerQueryItemVo
     */
    MissionWorkerQueryItemVo[] getMissionByUsername(String username);

    /**
     * get the infomation of  instance by username and missionId
     * @param username
     * @param missionId
     * @return the instance matching username and missionId
     */
    MissionInstanceDetailVo getInstanceByUsernameAndMissionId(String username, int missionId);

    /**
     * delte the mission of a worker
     * @param missionId
     * @param username
     * @return
     */
    boolean deleteInstance(int missionId,String username);
}
