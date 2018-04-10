package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.MissionAlreadyAcceptedException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

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
     * @param instanceVo
     */
    int saveInstance(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException;


    /**
     * get instance by username
     * @param workerusername
     * @return the list of  the MissionWorkerQueryItemVo
     */
    InstanceVo[] getInstanceByWorkerUsername(String workerusername);

    /**
     * get the infomation of  instance by username and missionId
     * @param workerusername
     * @param missionId
     * @return the instance matching username and missionId
     */
    InstanceDetailVo getInstanceByUsernameAndMissionId(String workerusername, int missionId);

    /**
     * delte the mission of a worker
     * @param missionId
     * @param username
     * @return
     */
    boolean deleteInstance(int missionId,String username);
}
