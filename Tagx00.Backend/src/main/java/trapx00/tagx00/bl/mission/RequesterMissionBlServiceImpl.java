package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.mission.requester.MissionChargeResponse;
import trapx00.tagx00.response.mission.requester.MissionRequestQueryResponse;
import trapx00.tagx00.security.jwt.JwtService;
import trapx00.tagx00.security.jwt.JwtUser;
import trapx00.tagx00.util.Converter;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.image.ImageMissionProperties;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;

import java.util.ArrayList;
import java.util.Arrays;

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
        int missionId = requesterMissionDataService.saveMission(generateMission(mission));
        JwtUser jwtUser = (JwtUser) userDetailsService.loadUserByUsername(username);
        String token = jwtService.generateToken(jwtUser, EXPIRATION);
        return new MissionCreateResponse(String.valueOf(missionId), token);
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
    public InstanceResponse queryInstances(String missionId) throws InstanceNotExistException {
        InstanceVo[] instance = requesterMissionDataService.getInstancesByMissionId(MissionUtil.getId(missionId), MissionUtil.getType(missionId));
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
    public InstanceDetailResponse queryInstance(String instanceId) throws InstanceNotExistException {
        InstanceDetailVo instanceVo = requesterMissionDataService.getInstanceByInstanceId(MissionUtil.getId(instanceId), MissionUtil.getType(instanceId));
        if (instanceVo == null)
            throw new InstanceNotExistException();
        InstanceDetailResponse instanceDetailResponse = new InstanceDetailResponse(instanceVo);
        return instanceDetailResponse;
    }

    /**
     * charge for the mission
     *
     * @param missionId
     * @param credits
     * @return MissionChargeResponse
     */
    @Override
    public MissionChargeResponse chargeMission(String missionId, int credits)throws SystemException {
        requesterMissionDataService.updateMission(MissionUtil.getId(missionId),credits,MissionUtil.getType(missionId));
        Mission mission=requesterMissionDataService.getMissionByMissionId(MissionUtil.getId(missionId),MissionUtil.getType(missionId));
        return new MissionChargeResponse(mission.getCredits());
    }

    /**
     * query the mission's credits
     *
     * @param missionId
     * @return MissionRequestQueryResponse
     */
    @Override
    public MissionRequestQueryResponse queryMissionCredits(String missionId) throws MissionIdDoesNotExistException {
        Mission result=null;
        if((result=requesterMissionDataService.getMissionByMissionId(MissionUtil.getId(missionId),
                MissionUtil.getType(missionId)))==null)
            throw new MissionIdDoesNotExistException();
        else
            return new MissionRequestQueryResponse(result.getCredits());
    }


    /**
     * finlize the instance
     *
     * @param instanceId
     * @param missionFinalizeVo
     * @return InstanceDetailResponse
     */
    @Override
    public InstanceDetailResponse finalize(String instanceId, MissionFinalizeVo missionFinalizeVo) throws InstanceNotExistException,SystemException {
        requesterMissionDataService.updateInstance(MissionUtil.getId(instanceId),missionFinalizeVo,MissionUtil.getType(instanceId));
        return new InstanceDetailResponse(
                requesterMissionDataService.getInstanceByInstanceId(MissionUtil.getId(instanceId),MissionUtil.getType(instanceId)));
    }

    private Mission generateMission(MissionCreateVo missionCreateVo) {
        switch (missionCreateVo.getMissionType()) {
            case IMAGE:
                return new ImageMission(0, missionCreateVo.getTitle(), missionCreateVo.getDescription(), missionCreateVo.getTopics(), missionCreateVo.isAllowCustomTag(), missionCreateVo.getAllowedTags(), missionCreateVo.getMissionType(), MissionState.PENDING, missionCreateVo.getStart(), missionCreateVo.getEnd(), "", UserInfoUtil.getUsername(), missionCreateVo.getLevel(), missionCreateVo.getCredits(), missionCreateVo.getMinimalWorkerLevel(), new ArrayList<String>(), ((ImageMissionProperties) missionCreateVo.getProperties()).getImageMissionTypes());
        }
        return null;
    }
}
