package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.response.mission.requester.MissionChargeResponse;
import trapx00.tagx00.response.mission.requester.MissionRequestQueryResponse;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;

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
    InstanceResponse queryInstances(String missionId) throws InstanceNotExistException;

    /**
     * query to get the instance of the mission
     *
     * @param instanceId the id of the mission
     * @return the detail response with instance of a mission
     */
    InstanceDetailResponse queryInstance(String instanceId)throws InstanceNotExistException;

    /**
     * charge for the mission
     * @param missionId
     * @param credits
     * @return  MissionChargeResponse
     */
    MissionChargeResponse chargeMission(String missionId, int credits);


    /**
     * query the mission's credits
     * @param missionId
     * @return MissionRequestQueryResponse
     */
    MissionRequestQueryResponse queryMissionCredits (String missionId);


    /**
     * finlize the instance
     * @param instanceId
     * @param missionFinalizeVo
     * @return InstanceDetailResponse
     */
    InstanceDetailResponse finalize(String instanceId, MissionFinalizeVo missionFinalizeVo)throws InstanceNotExistException;


}

