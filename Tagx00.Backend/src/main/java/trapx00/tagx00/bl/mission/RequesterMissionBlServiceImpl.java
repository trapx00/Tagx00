package trapx00.tagx00.bl.mission;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.mission.requester.MissionChargeResponse;
import trapx00.tagx00.response.mission.requester.MissionRequestQueryResponse;
import trapx00.tagx00.security.jwt.JwtService;
import trapx00.tagx00.security.jwt.JwtUser;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.image.ImageMissionProperties;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class RequesterMissionBlServiceImpl implements RequesterMissionBlService {
    private final static long EXPIRATION = 604800;
    private final RequesterMissionDataService requesterMissionDataService;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;


    @Autowired
    public RequesterMissionBlServiceImpl(RequesterMissionDataService requesterMissionDataService,
                                         @Qualifier("jwtUserDetailsServiceImpl") UserDetailsService userDetailsService, JwtService jwtService) {
        this.requesterMissionDataService = requesterMissionDataService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;

    }

    /**
     * create a mission
     *
     * @param mission
     * @return the combination of the id and token
     */
    @Override
    public MissionCreateResponse createMission(MissionCreateVo mission) throws SystemException {
        String username = UserInfoUtil.getUsername();
        int missiondId = requesterMissionDataService.saveMission(new Mission(mission.getTitle(), mission.getDescription(),
                mission.getTopics(), mission.getCustomTag(), mission.getAllowedTags(), mission.getMissionType(),
                MissionState.PENDING, mission.getStart(),
                mission.getEnd(), "", UserInfoUtil.getUsername(), new ArrayList<>(), ((ImageMissionProperties)mission.getProperties()).getImageMissionTypes()));
        JwtUser jwtUser = (JwtUser) userDetailsService.loadUserByUsername(username);
        String token = jwtService.generateToken(jwtUser, EXPIRATION);
        return new MissionCreateResponse(String.valueOf(missiondId), token);


    }
    /**
     *
     */

    /**
     * query to get instances of a mission
     *
     * @param missionId
     * @return the list of MissionInstanceItemVo
     */
    @Override
    public InstanceResponse queryInstances(int missionId) throws InstanceNotExistException {
        InstanceVo[] instance = requesterMissionDataService.getInstanceBymissionId(missionId);
        if (instance == null)
            throw new InstanceNotExistException();
        InstanceResponse instanceResponse = new InstanceResponse(Arrays.asList(instance));
        return instanceResponse;
    }

    /**
     * query to get the instance of the mission
     *
     * @param instanceId the id of the mission
     * @return the detail response with instance of a mission
     */
    @Override
    public InstanceDetailResponse queryInstance(int instanceId) throws InstanceNotExistException {
        InstanceDetailVo instanceVo = requesterMissionDataService.getInstanceByinstanceId(instanceId);
        if (instanceVo == null)
            throw new InstanceNotExistException();
        InstanceDetailResponse instanceDetailResponse = new InstanceDetailResponse(instanceVo);
        return instanceDetailResponse;
    }

    /**
     * charge for the mission
     * @param missionId
     * @param credits
     * @return  MissionChargeResponse
     */
    @Override
    public MissionChargeResponse chargeMission(int missionId, int credits) {
        return null;
    }

    /**
     * query the mission's credits
     * @param missionId
     * @return MissionRequestQueryResponse
     */
    @Override
    public MissionRequestQueryResponse queryMissionCredits(int missionId) {
        return null;
    }


    /**
     * finlize the instance
     * @param instanceId
     * @param missionFinalizeVo
     * @return InstanceDetailResponse
     */
    @Override
    public InstanceDetailResponse finalize(int instanceId, MissionFinalizeVo missionFinalizeVo) throws InstanceNotExistException {
        return null;
    }
}
