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
     * get all missions of the publisher
     *
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    MissionQueryResponse queryOnes(String username)throws MissionDoesNotExistFromUsernameException;

    /**
     * get the detail of a mission
     *
     * @param missionId
     * @return MissionRequesterQueryDetailVo
     */
    MissionQueryDetailResponse queryMissionDetail(int missionId) throws MissionIdDoesNotExistException;


    /**
     * query to get instances of a mission
     *
     * @param missionId
     * @return the list of MissionInstanceItemVo
     */
    MissionInstancesQueryResponse queryInstances(int missionId) throws InstanceNotExistException;

    /**
     * query to get the instance of the mission
     *
     * @param instanceId the id of the mission
     * @return the detail response with instance of a mission
     */
    MissionInstanceQueryDetailResponse queryInstance(int instanceId)throws InstanceNotExistException;
}

