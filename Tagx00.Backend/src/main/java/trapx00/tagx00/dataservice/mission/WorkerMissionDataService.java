package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;
import trapx00.tagx00.vo.mission.worker.MissionWorkerQueryItemVo;

public interface WorkerMissionDataService {
    /**
     * save the progress of the instance.
     * if not accpet the mission before, the system will create a instance for workers
     * also use to abort the instance
     * @param missionInstanceItemVo
     */
    void saveInstance(MissionInstanceItemVo missionInstanceItemVo);


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
}
