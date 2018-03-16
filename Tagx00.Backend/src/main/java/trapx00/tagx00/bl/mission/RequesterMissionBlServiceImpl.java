package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.security.jwt.JwtService;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

@Service
public class RequesterMissionBlServiceImpl implements RequesterMissionBlService {

    private final RequesterMissionDataService  requesterMissionDataService;
    private final JwtService jwtService;


    @Autowired
    public RequesterMissionBlServiceImpl(RequesterMissionDataService requesterMissionDataService,JwtService jwtService) {
        this.requesterMissionDataService = requesterMissionDataService;
        this.jwtService = jwtService;

    }

    /**
     * create a mission
     *
     * @param mission
     * @return the combination of the id and token
     */
    @Override
    public MissionCreateResponse createMission(MissionCreateVo mission) {

        requesterMissionDataService.saveMission(new Mission(mission.getTitle(),mission.getDescription(),
                mission.getTopics(),mission.getCustomTag(),mission.getAllowedTags(), MissionType.IMAGE,));

        return new MissionCreateResponse();
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
