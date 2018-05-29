package trapx00.tagx00.dataservice.mission;

import net.sf.json.JSONArray;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.exception.viewexception.MissionAlreadyAcceptedException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.io.IOException;

public interface WorkerMissionDataService {

    /**
     * update the progress of the instance.
     *
     * @param instanceVo
     */
    String updateInstanceDetailVo(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException, IOException;

    /**
     * save the progress of the instance.
     * if not accpet the mission before, the system will create a instance for workers
     * also use to abort the instance
     *
     * @param instanceVo
     */
    String saveInstanceDetailVo(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException, IOException;

    /**
     * save the instance
     *
     * @param instanceId
     * @param missionType
     */
    int abortInstance(String instanceId, MissionType missionType) throws IOException;


    /**
     * get instance by username
     *
     * @param workerUsername
     * @return the list of  the MissionWorkerQueryItemVo
     */
    InstanceVo[] getInstanceByWorkerUsername(String workerUsername);

    /**
     * get the information of  instance by username and missionId
     *
     * @param workerUsername
     * @param missionId
     * @param missionType
     * @return the instance matching username and missionId
     */
    InstanceDetailVo getInstanceDetailVoByUsernameAndMissionId(String workerUsername, String missionId, MissionType missionType);

    /**
     * get the information of  instance by username and missionId
     *
     * @param workerUsername
     * @param missionId
     * @param missionType
     * @return the instance matching username and missionId
     */
    Instance getInstanceByUsernameAndMissionId(String workerUsername, String missionId, MissionType missionType);

    /**
     * delete the mission of a worker
     *
     * @param missionId
     * @param username
     * @param missionType
     * @return
     */
    boolean deleteInstanceByMissionIdAndUsername(String missionId, String username, MissionType missionType);

    /**
     * identify the image
     *
     * @param bytes
     * @return
     */
    JSONArray identifyImage(byte[] bytes) throws SystemException;
}
