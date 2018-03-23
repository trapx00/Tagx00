package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.security.jwt.JwtService;
import trapx00.tagx00.security.jwt.JwtUser;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

import java.util.Arrays;

@Service
public class RequesterMissionBlServiceImpl implements RequesterMissionBlService {
    private final static long EXPIRATION = 604800;
    private final RequesterMissionDataService  requesterMissionDataService;
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
    public MissionCreateResponse createMission(MissionCreateVo mission)throws SystemException {

            String username= UserInfoUtil.getUsername();
            int missiondId=requesterMissionDataService.saveMission(new Mission(mission.getTitle(),mission.getDescription(),
                    mission.getTopics(),mission.getCustomTag(),mission.getAllowedTags(), mission.getMissionType(),
                    MissionState.PENDING,mission.getStart(),
                    mission.getEnd(),mission.getCoverUrls(),UserInfoUtil.getUsername(),mission.getUrls(),mission.getImageMissionType()));
            JwtUser jwtUser = (JwtUser) userDetailsService.loadUserByUsername(username);
            String token = jwtService.generateToken(jwtUser, EXPIRATION);
            return new MissionCreateResponse(token,String.valueOf(missiondId));


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
    public InstanceResponse queryInstances(int missionId) throws InstanceNotExistException
    {
        InstanceVo[] instance=requesterMissionDataService.getInstanceBymissionId(missionId);
        if(instance==null)
            throw new InstanceNotExistException();
        InstanceResponse instanceResponse=new InstanceResponse(Arrays.asList(instance));
        return instanceResponse;
    }

    /**
     * query to get the instance of the mission
     *
     * @param instanceId the id of the mission
     * @return the detail response with instance of a mission
     */
    @Override
    public InstanceDetailResponse queryInstance(int instanceId) throws InstanceNotExistException{
        InstanceDetailVo instanceVo =requesterMissionDataService.getInstanceByinstanceId(instanceId);
        if(instanceVo ==null)
            throw new InstanceNotExistException();
        InstanceDetailResponse instanceDetailResponse=new InstanceDetailResponse(instanceVo);
        return instanceDetailResponse;
    }
}
