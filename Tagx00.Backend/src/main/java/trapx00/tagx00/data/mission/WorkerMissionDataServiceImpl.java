package trapx00.tagx00.data.mission;

import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;
import trapx00.tagx00.vo.mission.worker.MissionWorkerQueryItemVo;

public class WorkerMissionDataServiceImpl implements WorkerMissionDataService {
    /**
     * save the progress of the instance.
     * if not accpet the mission before, the system will create a instance for workers
     * also use to abort the instance
     * @param missionInstanceItemVo
     */
    @Override
    public void saveInstance(MissionInstanceItemVo missionInstanceItemVo) {

    }
    /**
     * get missionid by username
     * @param username
     * @return the list of  the MissionWorkerQueryItemVo
     */
    @Override
    public MissionWorkerQueryItemVo[] getMissionByUsername(String username) {
        return null;
    }
    /**
     * get the infomation of  instance by username and missionId
     * @param username
     * @param missionId
     * @return the instance matching username and missionId
     */
    @Override
    public MissionInstanceDetailVo getInstanceByUsernameAndMissionId(String username, int missionId) {
        return null;
    }
}
