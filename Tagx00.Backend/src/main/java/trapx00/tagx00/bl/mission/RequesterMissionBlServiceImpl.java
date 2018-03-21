package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.MissionDoesNotExistFromUsernameException;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.security.jwt.JwtService;
import trapx00.tagx00.security.jwt.JwtUser;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryDetailVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;

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
                    mission.getTopics(),mission.getCustomTag(),mission.getAllowedTags(), mission.getMissionType(),mission.getStart(),
                    mission.getEnd(),null,null,username));
            JwtUser jwtUser = (JwtUser) userDetailsService.loadUserByUsername(username);
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
    public MissionQueryResponse queryOnes(String username)  throws MissionDoesNotExistFromUsernameException{

        MissionRequesterQueryItemVo[]result= requesterMissionDataService.getMissionByUsername(username);
        if(result==null)
            throw new MissionDoesNotExistFromUsernameException();
        return new MissionQueryResponse(Arrays.asList(result));
    }

    /**
     * get the detail of a mission
     *
     * @param missionId
     * @return MissionRequesterQueryDetailVo
     */
    @Override
    public MissionQueryDetailResponse queryMissionDetail(int missionId)  throws MissionIdDoesNotExistException{

        Mission mission=requesterMissionDataService.getMissionByMissionId(missionId);
        if(mission==null)
            throw new MissionIdDoesNotExistException();
        return new MissionQueryDetailResponse(new MissionRequesterQueryDetailVo(mission.getTitle(),
                mission.getDescription(),new MissionProperties(mission.getMissionType()),mission.getMissionState(),mission.getCoverUrl(),
                mission.getUrls()));
    }

    /**
     * query to get instances of a mission
     *
     * @param missionId
     * @return the list of MissionInstanceItemVo
     */
    @Override
    public MissionInstancesQueryResponse queryInstances(int missionId) throws InstanceNotExistException
    {
        InstanceVo[] instance=requesterMissionDataService.getInstanceBymissionId(missionId);
        if(instance==null)
            throw new InstanceNotExistException();
        MissionInstancesQueryResponse missionRequesterQueryItemVo=new MissionInstancesQueryResponse(Arrays.asList(instance));
        return missionRequesterQueryItemVo;
    }

    /**
     * query to get the instance of the mission
     *
     * @param instanceId the id of the mission
     * @return the detail response with instance of a mission
     */
    @Override
    public MissionInstanceQueryDetailResponse queryInstance(int instanceId) throws InstanceNotExistException{
        InstanceVo instanceVo =requesterMissionDataService.getInstanceById(instanceId);
        Mission mission=requesterMissionDataService.getMissionByMissionId(instanceVo.getMissionId());
        if(instanceVo ==null)
            throw new InstanceNotExistException();
        MissionInstanceQueryDetailResponse missionInstanceQueryDetailResponse=new MissionInstanceQueryDetailResponse(
                new InstanceDetailVo(instanceVo.getInstanceId(), instanceVo.getMissionId(), instanceVo.getWorkerUsername(),
                        MissionInstanceState.IN_PROGRESS, instanceVo.getAcceptDate(), instanceVo.getSubmitDate(),
                        instanceVo.getCompletedCount(), instanceVo.getTotalCount(),mission.isAllowCustomTag(),
                        new MissionProperties(mission.getMissionType()))
        );
        /**
         * 参数中有参数未解决
         */
        return missionInstanceQueryDetailResponse;
    }
}
