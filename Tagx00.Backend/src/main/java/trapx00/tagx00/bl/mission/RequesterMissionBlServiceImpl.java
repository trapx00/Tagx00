package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.RequesterMissionBlService;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.dataservice.topic.TopicDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.*;
import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.mission.requester.MissionChargeResponse;
import trapx00.tagx00.response.mission.requester.MissionRequestQueryResponse;
import trapx00.tagx00.security.jwt.JwtService;
import trapx00.tagx00.security.jwt.JwtUser;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.audio.AudioMissionProperties;
import trapx00.tagx00.vo.mission.image.ImageMissionProperties;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;
import trapx00.tagx00.vo.mission.text.TextMissionProperties;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionProperties;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;
import trapx00.tagx00.vo.mission.video.VideoMissionProperties;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

@Service
public class RequesterMissionBlServiceImpl implements RequesterMissionBlService {
    private final static long EXPIRATION = 604800;
    private final RequesterMissionDataService requesterMissionDataService;
    private final UserDataService userDataService;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final PythonService pythonService;
    private final TopicDataService topicDataService;

    @Autowired
    public RequesterMissionBlServiceImpl(RequesterMissionDataService requesterMissionDataService,
                                         UserDataService userDataService, @Qualifier("jwtUserDetailsServiceImpl") UserDetailsService userDetailsService, JwtService jwtService, PythonService pythonService, TopicDataService topicDataService) {
        this.requesterMissionDataService = requesterMissionDataService;
        this.userDataService = userDataService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.pythonService = pythonService;
        this.topicDataService = topicDataService;
    }

    /**
     * create a mission
     *
     * @param mission
     * @return the combination of the id and token
     */
    @Override
    public MissionCreateResponse createMission(MissionCreateVo mission) throws SystemException {
//        KeysVo keysVo = pythonService.extractKey(mission.getDescription());
//        for (String topic : keysVo.getKeys()) {
//            if (!topicDataService.isTopicExists(topic)) {
//                topicDataService.addTopic(topic);
//            }
//        }
        String username = UserInfoUtil.getUsername();
//        mission.setTopics(keysVo.getKeys());

        String missionId;
        try {
            missionId = requesterMissionDataService.saveMission(generateMission(mission));
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        User user = userDataService.getUserByUsername(username);
        user.setCredits(user.getCredits() - mission.getCredits());
        userDataService.saveUser(user);
        JwtUser jwtUser = (JwtUser) userDetailsService.loadUserByUsername(username);
        String token = jwtService.generateToken(jwtUser, EXPIRATION);
        return new MissionCreateResponse(missionId, token);
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
    public InstanceResponse queryInstances(String missionId) {
        if (missionId.length() == 0) {
            return queryAllInstances();
        }
        InstanceVo[] instance = requesterMissionDataService.getInstancesByMissionId(missionId, MissionUtil.getType(missionId));
        return new InstanceResponse(Arrays.asList(instance));
    }

    private InstanceResponse queryAllInstances() {
        InstanceVo[] instance = requesterMissionDataService.getAllInstances();
        return new InstanceResponse(Arrays.asList(instance));
    }

    /**
     * query to get the instance of the mission
     *
     * @param instanceId the id of the mission
     * @return the detail response with instance of a mission
     */
    @Override
    public InstanceDetailResponse queryInstance(String instanceId) throws InstanceNotExistException {
        InstanceDetailVo instanceVo = requesterMissionDataService.getInstanceByInstanceId(instanceId, MissionUtil.getType(instanceId));
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
    public MissionChargeResponse chargeMission(String missionId, int credits) throws SystemException, MissionIdDoesNotExistException {
        try {
            requesterMissionDataService.updateMission(missionId, credits, MissionUtil.getType(missionId));
            User user = userDataService.getUserByUsername(UserInfoUtil.getUsername());
            user.setCredits(user.getCredits() - credits);
            userDataService.saveUser(user);
            Mission mission = requesterMissionDataService.getMissionByMissionId(missionId);
            return new MissionChargeResponse(mission.getCredits());
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    /**
     * query the mission's credits
     *
     * @param missionId
     * @return MissionRequestQueryResponse
     */
    @Override
    public MissionRequestQueryResponse queryMissionCredits(String missionId) throws MissionIdDoesNotExistException, SystemException {
        try {
            Mission result = requesterMissionDataService.getMissionByMissionId(missionId);
            return new MissionRequestQueryResponse(result.getCredits());
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }


    /**
     * finlize the instance
     *
     * @param instanceId
     * @param missionFinalizeVo
     * @return InstanceDetailResponse
     */
    @Override
    public InstanceDetailResponse finalize(String instanceId, MissionFinalizeVo missionFinalizeVo) throws SystemException, MissionIdDoesNotExistException {
        try {
            requesterMissionDataService.updateInstance(instanceId, missionFinalizeVo, MissionUtil.getType(instanceId));
            InstanceDetailVo instanceDetailVo = requesterMissionDataService.getInstanceByInstanceId(instanceId, MissionUtil.getType(instanceId));
            String missionId = instanceDetailVo.getInstance().getMissionId();
            Mission mission = requesterMissionDataService.getMissionByMissionId(missionId);
            User user = userDataService.getUserByUsername(instanceDetailVo.getInstance().getWorkerUsername());
            user.setCredits(user.getCredits() + missionFinalizeVo.getCredits());
            user.setExp(user.getExp() + missionFinalizeVo.getExpRatio() * mission.getLevel() * 20);

            userDataService.saveUser(user);

            requesterMissionDataService.updateMission(mission.getMissionId(), -missionFinalizeVo.getCredits(), mission.getMissionType());

            return new InstanceDetailResponse(
                    requesterMissionDataService.getInstanceByInstanceId(instanceId, MissionUtil.getType(instanceId)));
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    private Mission generateMission(MissionCreateVo missionCreateVo) {
        switch (missionCreateVo.getProperties().getType()) {
            case IMAGE:
                return new ImageMission("", missionCreateVo.getTitle(), missionCreateVo.getDescription(),
                        missionCreateVo.getTopics(),
                        MissionState.PENDING,
                        missionCreateVo.getStart(), missionCreateVo.getEnd(), "", UserInfoUtil.getUsername(),
                        missionCreateVo.getLevel(),
                        missionCreateVo.getCredits(), missionCreateVo.getMinimalWorkerLevel(),
                        ((ImageMissionProperties) missionCreateVo.getProperties()).isAllowCustomTag(),
                        new ArrayList<>(((ImageMissionProperties) missionCreateVo.getProperties()).getAllowedTags().keySet()),
                        new ArrayList<>(),
                        ((ImageMissionProperties) missionCreateVo.getProperties()).getImageMissionTypes(),
                        new ArrayList<>());
            case TEXT:
                return new TextMission("", missionCreateVo.getTitle(), missionCreateVo.getDescription(),
                        missionCreateVo.getTopics(), MissionState.PENDING,
                        missionCreateVo.getStart(), missionCreateVo.getEnd(),
                        "", UserInfoUtil.getUsername(), missionCreateVo.getLevel(), missionCreateVo.getCredits(),
                        missionCreateVo.getMinimalWorkerLevel(), new HashSet<>(), ((TextMissionProperties) missionCreateVo.getProperties()).getSettings(), new ArrayList<>()
                );
            case THREE_DIMENSION:
                return new ThreeDimensionMission("", missionCreateVo.getTitle(), missionCreateVo.getDescription(),
                        missionCreateVo.getTopics(),
                        MissionState.PENDING,
                        missionCreateVo.getStart(), missionCreateVo.getEnd(), "", UserInfoUtil.getUsername(),
                        missionCreateVo.getLevel(),
                        missionCreateVo.getCredits(), missionCreateVo.getMinimalWorkerLevel(),
                        ((ThreeDimensionMissionProperties) missionCreateVo.getProperties()).isAllowCustomTag(), ((ThreeDimensionMissionProperties) missionCreateVo.getProperties()).getTags(),
                        new ArrayList<>(), ThreeDimensionMissionType.WHOLE,
                        new ArrayList<>());
            case VIDEO:
                return new VideoMission("", missionCreateVo.getTitle(), missionCreateVo.getDescription(),
                        missionCreateVo.getTopics(),
                        MissionState.PENDING,
                        missionCreateVo.getStart(), missionCreateVo.getEnd(), "", UserInfoUtil.getUsername(),
                        missionCreateVo.getLevel(),
                        missionCreateVo.getCredits(), missionCreateVo.getMinimalWorkerLevel(),
                        ((VideoMissionProperties) missionCreateVo.getProperties()).isAllowCustomTag(),
                        ((VideoMissionProperties) missionCreateVo.getProperties()).getTags(),
                        new ArrayList<>(),
                        ((VideoMissionProperties) missionCreateVo.getProperties()).getVideoMissionTypes(),
                        new ArrayList<>());
            case AUDIO:
                return new AudioMission("", missionCreateVo.getTitle(), missionCreateVo.getDescription(),
                        missionCreateVo.getTopics(),
                        MissionState.PENDING,
                        missionCreateVo.getStart(), missionCreateVo.getEnd(), "", UserInfoUtil.getUsername(),
                        missionCreateVo.getLevel(),
                        missionCreateVo.getCredits(), missionCreateVo.getMinimalWorkerLevel(),
                        ((AudioMissionProperties) missionCreateVo.getProperties()).isAllowCustomTag(),
                        ((AudioMissionProperties) missionCreateVo.getProperties()).getTags(),
                        new ArrayList<>(),
                        ((AudioMissionProperties) missionCreateVo.getProperties()).getAudioMissionTypes(),
                        new ArrayList<>());

        }
        return null;
    }
}
