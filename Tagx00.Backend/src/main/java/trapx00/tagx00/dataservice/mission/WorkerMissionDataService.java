package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.MissionAlreadyAcceptedException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

public interface WorkerMissionDataService {
    /**
     * get mission by mission id
     *
     * @param missionId   the id of the mission({type}-{id})
     * @param missionType
     * @return the mission object
     */
    Mission getMissionByMissionId(int missionId, MissionType missionType);

    /**
     * save the progress of the instance.
     * if not accpet the mission before, the system will create a instance for workers
     * also use to abort the instance
     *
     * @param instanceVo
     */
    int saveInstance(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException;


    /**
     * get instance by username
     *
     * @param workerusername
     * @return the list of  the MissionWorkerQueryItemVo
     */
    InstanceVo[] getInstanceByWorkerUsername(String workerusername);

    /**
     * get the infomation of  instance by username and missionId
     *
     * @param workerusername
     * @param missionId
     * @param missionType
     * @return the instance matching username and missionId
     */
    InstanceDetailVo getInstanceByUsernameAndMissionId(String workerusername, int missionId, MissionType missionType);

    /**
     * delte the mission of a worker
     *
     * @param missionId
     * @param username
     * @param missionType
     * @return
     */
    boolean deleteInstanceByMissionIdAndUsername(int missionId, String username, MissionType missionType);
}
