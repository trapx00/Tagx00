package trapx00.tagx00.bl.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

@Service
public class RequesterMissionBlServiceImpl implements RequesterMissionBlService {

    /**
     * create a mission
     *
     * @param mission
     * @return the combination of the id and token
     */
    @Override
    public MissionCreateResponse createMission(MissionCreateVo mission) {
        return null;
    }

    /**
     * get all missions of the publisher
     *
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    @Override
    public MissionQueryResponse queryOnes(String username) {
        return null;
    }

    /**
     * get the detail of a mission
     *
     * @param missionId
     * @return MissionRequesterQueryDetailVo
     */
    @Override
    public MissionQueryDetailResponse queryMissionDetail(int missionId) {
        return null;
    }

    /**
     * query to get instances of a mission
     *
     * @param missionId
     * @return the list of MissionInstanceItemVo
     */
    @Override
    public MissionInstancesQueryResponse queryInstances(int missionId) {
        return null;
    }

    /**
     * query to get the instance of the mission
     *
     * @param missionId the id of the mission
     * @return the detail response with instance of a mission
     */
    @Override
    public MissionInstanceQueryDetailResponse queryInstance(int missionId) {
        return null;
    }
}
