package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.MissionDoesNotExistFromUsernameException;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

public interface RequesterMissionBlService {

    /**
     * create a mission
     *
     * @param mission
     * @return the combination of the id and token
     */
    MissionCreateResponse createMission(MissionCreateVo mission) throws SystemException;


    /**
     * query to get instances of a mission
     *
     * @param missionId
     * @return the list of MissionInstanceItemVo
     */
    InstanceResponse queryInstances(int missionId) throws InstanceNotExistException;

    /**
     * query to get the instance of the mission
     *
     * @param instanceId the id of the mission
     * @return the detail response with instance of a mission
     */
    InstanceDetailResponse queryInstance(int instanceId)throws InstanceNotExistException;

}

