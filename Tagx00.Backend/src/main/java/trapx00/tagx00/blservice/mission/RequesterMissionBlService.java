package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

public interface RequesterMissionBlService {

    /**
     * create a mission
     *
     * @param mission
     * @return the combination of the id and token
     */
    MissionCreateResponse createMission(MissionCreateVo mission);

    /**
     * get all missions of the publisher
     *
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    MissionQueryResponse queryOnes(String username);

    /**
     * get the detail of a mission
     *
     * @param missionId
     * @return MissionRequesterQueryDetailVo
     */
    MissionQueryDetailResponse queryMissionDetail(int missionId);


    /**
     * query to get instances of a mission
     *
     * @param missionId
     * @return the list of MissionInstanceItemVo
     */
    MissionInstancesQueryResponse queryInstances(int missionId);

    /**
     * query to get the instance of the mission
     *
     * @param missionId the id of the mission
     * @return the detail response with instance of a mission
     */
    MissionInstanceQueryDetailResponse queryInstance(int missionId);
}

