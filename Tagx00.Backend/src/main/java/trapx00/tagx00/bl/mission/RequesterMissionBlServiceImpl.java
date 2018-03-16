package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Instance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.security.jwt.JwtService;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryDetailVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;

import java.util.Arrays;

@Service
public class RequesterMissionBlServiceImpl implements RequesterMissionBlService {
    private final static long EXPIRATION = 604800;
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

        int missiondId=requesterMissionDataService.saveMission(new Mission(mission.getTitle(),mission.getDescription(),
                mission.getTopics(),mission.getCustomTag(),mission.getAllowedTags(), MissionType.IMAGE,));
        String token = jwtService.generateToken(jwtUser, EXPIRATION);
        return new MissionCreateResponse(token,String.valueOf(missiondId));
    }

    /**
     * get all missions of the publisher
     *
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    @Override
    public MissionQueryResponse queryOnes(String username) {

        MissionRequesterQueryItemVo[]result= requesterMissionDataService.getMissionByUsername(username);

        return new MissionQueryResponse(Arrays.asList(result));
    }

    /**
     * get the detail of a mission
     *
     * @param missionId
     * @return MissionRequesterQueryDetailVo
     */
    @Override
    public MissionQueryDetailResponse queryMissionDetail(int missionId) {

        Mission mission=requesterMissionDataService.getMissionByMissionId(missionId);
        return new MissionQueryDetailResponse(new MissionRequesterQueryDetailVo(mission.getTitle(),
                mission.getDescription(),new MissionVo(mission.getMissionType()), MissionState.ACTIVE,mission.getCoverUrl(),
                mission.getUrls()));
    }

    /**
     * query to get instances of a mission
     *
     * @param missionId
     * @return the list of MissionInstanceItemVo
     */
    @Override
    public MissionInstancesQueryResponse queryInstances(int missionId)
    {
        Instance instance=requesterMissionDataService.getInstanceBymissionId(missionId);
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
