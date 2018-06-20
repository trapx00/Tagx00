package trapx00.tagx00.data.account;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.data.dao.mission.instance.*;
import trapx00.tagx00.data.dao.mission.topic.TopicDao;
import trapx00.tagx00.data.dao.user.UserDao;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.*;
import trapx00.tagx00.entity.mission.instance.*;
import trapx00.tagx00.entity.mission.topic.Topic;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;
import trapx00.tagx00.vo.mission.text.TextMissionType;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;
import trapx00.tagx00.vo.mission.video.VideoMissionType;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserDataServiceImplTest {
    @Autowired
    private UserDataService userDataService;
    @Autowired
    private UserDao userDao;
    @Autowired
    private MissionDao missionDao;
    @Autowired
    private TopicDao topicDao;

    @Autowired
    private AudioInstanceDao audioInstanceDao;

    @Autowired
    private VideoInstanceDao videoInstanceDao;

    @Autowired
    private ImageInstanceDao imageInstanceDao;

    @Autowired
    private TextInstanceDao textInstanceDao;

    @Autowired
    private ThreeDimensionInstanceDao threeDimensionInstanceDao;

    private Random random = new Random();
    private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private java.util.Date startDate = format.parse("2018-4-1 12:00:00");
    private java.util.Date notEndedDate = format.parse("2018-7-10 12:00:00");
    private java.util.Date endDate = new java.util.Date();

    public UserDataServiceImplTest() throws ParseException {
    }

    @Test
    public void isUserExistent() {
    }

    @Test
    public void addSomeWorkers() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String username = "999";
        String password = encoder.encode("999");
        String email = "445073309@qq.com";
        Role role = Role.WORKER;
        double exp = 0;
        int credits = 0;
        java.sql.Date sqlDate = new java.sql.Date(endDate.getTime());

        exp = 0;
        credits = random.nextInt(200000);
        long date = random(startDate.getTime(), endDate.getTime());
        sqlDate = new java.sql.Date(date);
        User user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);

        exp = 0;
        credits = random.nextInt(200000);
        date = random(startDate.getTime(), endDate.getTime());
        sqlDate = new java.sql.Date(date);
        username = "123";
        password = encoder.encode(username);
        user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);

        exp = 0;
        credits = random.nextInt(200000);
        date = random(startDate.getTime(), endDate.getTime());
        sqlDate = new java.sql.Date(date);
        username = "234";
        password = encoder.encode(username);
        user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);

        exp = 0;
        credits = random.nextInt(200000);
        date = random(startDate.getTime(), endDate.getTime());
        sqlDate = new java.sql.Date(date);
        username = "345";
        password = encoder.encode(username);
        user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);

        exp = 0;
        credits = random.nextInt(200000);
        date = random(startDate.getTime(), endDate.getTime());
        sqlDate = new java.sql.Date(date);
        username = "456";
        password = encoder.encode(username);
        user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);

        exp = 0;
        credits = random.nextInt(200000);
        date = random(startDate.getTime(), endDate.getTime());
        sqlDate = new java.sql.Date(date);
        username = "567";
        password = encoder.encode(username);
        user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);

        exp = 0;
        credits = random.nextInt(200000);
        date = random(startDate.getTime(), endDate.getTime());
        sqlDate = new java.sql.Date(date);
        username = "678";
        password = encoder.encode(username);
        user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);

        exp = 0;
        credits = random.nextInt(200000);
        date = random(startDate.getTime(), endDate.getTime());
        sqlDate = new java.sql.Date(date);
        username = "789";
        password = encoder.encode(username);
        user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);
    }

    @Test
    public void addTopics() {
        Topic topic = new Topic("动物");
        topicDao.save(topic);
        topic = new Topic("植物");
        topicDao.save(topic);
        topic = new Topic("日常用品");
        topicDao.save(topic);
        topic = new Topic("家居用品");
        topicDao.save(topic);
        topic = new Topic("生活用品");
        topicDao.save(topic);
    }

    @Test
    public void saveUser() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String username = "999";
        String password = encoder.encode("999");
        String email = "445073309@qq.com";
        Role role = Role.ADMIN;
        double exp = 0;
        int credits = 0;

        java.sql.Date sqlDate = new java.sql.Date(endDate.getTime());
        User user = new User(username, password, email, role, exp, credits, sqlDate);
        userDao.save(user);
        String randomInfo;

        for (int i = 0; i < 100; i++) {
            randomInfo = random.nextInt(10000) + "";
            username = randomInfo;
            password = encoder.encode(randomInfo);
            role = Role.REQUESTER;
            if (userDao.findUserByUsername(username) == null) {
                exp = 0;
                credits = random.nextInt(200000);
                long date = random(startDate.getTime(), endDate.getTime());
                sqlDate = new java.sql.Date(date);
                user = new User(username, password, email, role, exp, credits, sqlDate);
                userDao.save(user);

//                List<ImageMissionType> imageMissionTypes = new ArrayList<>();
//                imageMissionTypes.add(ImageMissionType.WHOLE);
//                imageMissionTypes.add(ImageMissionType.DISTRICT);
//                imageMissionTypes.add(ImageMissionType.PART);
//
//                ImageMission imageMission = new ImageMission(getNextMissionId(missionDao.findAll(), MissionType.IMAGE), "test", "test", new ArrayList<>(), MissionState.ACTIVE, startDate, endDate, "", username,
//                        1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), imageMissionTypes, new ArrayList<>());
//                missionDao.save(imageMission);

                for (int j = 0; j < 3; j++) {
                    int selectSeed = random.nextInt(6);
                    switch (selectSeed) {
                        case 1:
                            int selectCreate = random.nextInt(4);
                            switch (selectCreate) {
                                case 1:
                                    createImageMission(username, MissionState.PENDING);
                                    break;
                                case 2:
                                    createImageMission(username, MissionState.ACTIVE);
                                    break;
                                default:
                                    createImageMission(username, MissionState.ENDED);
                            }
                            break;
                        case 2:
                            selectCreate = random.nextInt(4);
                            switch (selectCreate) {
                                case 1:
                                    createAudioMission(username, MissionState.PENDING);
                                    break;
                                case 2:
                                    createAudioMission(username, MissionState.ACTIVE);
                                    break;
                                default:
                                    createAudioMission(username, MissionState.ENDED);
                            }
                            break;
                        case 3:
                            selectCreate = random.nextInt(4);
                            switch (selectCreate) {
                                case 1:
                                    createVideoMission(username, MissionState.PENDING);
                                    break;
                                case 2:
                                    createVideoMission(username, MissionState.ACTIVE);
                                    break;
                                default:
                                    createVideoMission(username, MissionState.ENDED);
                            }
                            break;
                        case 4:
                            selectCreate = random.nextInt(4);
                            switch (selectCreate) {
                                case 1:
                                    createTextMission(username, MissionState.PENDING);
                                    break;
                                case 2:
                                    createTextMission(username, MissionState.ACTIVE);
                                    break;
                                default:
                                    createTextMission(username, MissionState.ENDED);
                            }
                            break;
                        case 5:
                            selectCreate = random.nextInt(4);
                            switch (selectCreate) {
                                case 1:
                                    createThreeDimensionMission(username, MissionState.PENDING);
                                    break;
                                case 2:
                                    createThreeDimensionMission(username, MissionState.ACTIVE);
                                    break;
                                default:
                                    createThreeDimensionMission(username, MissionState.ENDED);
                            }
                            break;
                    }
                }
            }
        }

        List<Mission> missions = new ArrayList<>(missionDao.findAll());
        for (int i = 0; i < 500; i++) {
            randomInfo = random.nextInt(10000) + "";
            username = randomInfo;
            password = encoder.encode(randomInfo);
            role = Role.WORKER;
            if (userDao.findUserByUsername(username) == null) {
                exp = random.nextInt(1000);
                credits = random.nextInt(100000);
                long date = random(startDate.getTime(), endDate.getTime());
                sqlDate = new java.sql.Date(date);
                user = new User(username, password, email, role, exp, credits, sqlDate);
                userDao.save(user);
            }
            createInstancesForThisWorker(username, missions);
        }
    }

    private void createInstancesForThisWorker(String workerUsername, List<Mission> missions) {
        // 1/2
        for (Mission mission : missions) {
            if (random.nextInt(2) != 0) {
                continue; // no instance for this mission
            }

            //create instance for this mission
            switch (mission.getMissionType()) {
                case VIDEO:
                    createVideoInstance(workerUsername, (VideoMission) mission);
                    break;
                case AUDIO:
                    createAudioInstance(workerUsername, (AudioMission) mission);
                    break;
                case THREE_DIMENSION:
                    createThreeDimensionInstance(workerUsername, (ThreeDimensionMission) mission);
                    break;
                case IMAGE:
                    createImageInstance(workerUsername, (ImageMission) mission);
                    break;
                case TEXT:
                    createTextInstance(workerUsername, (TextMission) mission);

            }
        }
    }

    java.sql.Date getRandomDate(Date startDate, Date endDate) {
        long date = random(startDate.getTime(), endDate.getTime());
        return new java.sql.Date(date);
    }

    private void createImageInstance(String username, ImageMission imageMission) {

        // random state
        int r = random.nextInt(4);
        MissionInstanceState state = MissionInstanceState.values()[r];
        Date acceptDate = getRandomDate(imageMission.getStart(), imageMission.getEnd());
        Date submitDate = null;

        if (state.equals(MissionInstanceState.SUBMITTED) || state.equals(MissionInstanceState.FINALIZED)) {
            submitDate = getRandomDate(acceptDate, imageMission.getEnd());
        }

        ImageInstance instance = new ImageInstance(
            getNextInstanceId(imageInstanceDao.findAll(), MissionType.IMAGE),
            username,
            state,
            MissionType.IMAGE,
            acceptDate,
            submitDate,
            submitDate != null,
            imageMission.getMissionId(),
            0,
            0,
            submitDate == null ? 0 : random.nextInt(1000),
            "",
            null,
            imageMission

        );

        imageInstanceDao.save(instance);
    }

    private void createTextInstance(String username, TextMission textMission) {
        // random state
        int r = random.nextInt(4);
        MissionInstanceState state = MissionInstanceState.values()[r];
        Date acceptDate = getRandomDate(textMission.getStart(), textMission.getEnd());
        Date submitDate = null;

        if (state.equals(MissionInstanceState.SUBMITTED) || state.equals(MissionInstanceState.FINALIZED)) {
            submitDate = getRandomDate(acceptDate, textMission.getEnd());
        }

        TextInstance instance = new TextInstance(
            getNextInstanceId(textInstanceDao.findAll(), MissionType.TEXT),
            username,
            state,
            MissionType.TEXT,
            acceptDate,
            submitDate,
            submitDate != null,
            textMission.getMissionId(),
            0,
            0,
            submitDate == null ? 0 : random.nextInt(1000),
            "",
            null,
            textMission

        );

        textInstanceDao.save(instance);
    }

    private void createAudioInstance(String username, AudioMission mission) {
        int r = random.nextInt(4);
        MissionInstanceState state = MissionInstanceState.values()[r];
        Date acceptDate = getRandomDate(mission.getStart(), mission.getEnd());
        Date submitDate = null;

        if (state.equals(MissionInstanceState.SUBMITTED) || state.equals(MissionInstanceState.FINALIZED)) {
            submitDate = getRandomDate(acceptDate, mission.getEnd());
        }

        AudioInstance instance = new AudioInstance(
            getNextInstanceId(textInstanceDao.findAll(), MissionType.AUDIO),
            username,
            state,
            MissionType.AUDIO,
            acceptDate,
            submitDate,
            submitDate != null,
            mission.getMissionId(),
            0,
            0,
            submitDate == null ? 0 : random.nextInt(1000),
            "",
            null,
            mission

        );

        audioInstanceDao.save(instance);
    }

    private void createThreeDimensionInstance(String username, ThreeDimensionMission mission){
        int r = random.nextInt(4);
        MissionInstanceState state = MissionInstanceState.values()[r];
        Date acceptDate = getRandomDate(mission.getStart(), mission.getEnd());
        Date submitDate = null;

        if (state.equals(MissionInstanceState.SUBMITTED) || state.equals(MissionInstanceState.FINALIZED)) {
            submitDate = getRandomDate(acceptDate, mission.getEnd());
        }

        ThreeDimensionInstance instance = new ThreeDimensionInstance(
            getNextInstanceId(textInstanceDao.findAll(), MissionType.THREE_DIMENSION),
            username,
            state,
            MissionType.THREE_DIMENSION,
            acceptDate,
            submitDate,
            submitDate != null,
            mission.getMissionId(),
            0,
            0,
            submitDate == null ? 0 : random.nextInt(1000),
            "",
            null,
            mission

        );

        threeDimensionInstanceDao.save(instance);
    }

    private void createVideoInstance(String username, VideoMission mission) {
        int r = random.nextInt(4);
        MissionInstanceState state = MissionInstanceState.values()[r];
        Date acceptDate = getRandomDate(mission.getStart(), mission.getEnd());
        Date submitDate = null;

        if (state.equals(MissionInstanceState.SUBMITTED) || state.equals(MissionInstanceState.FINALIZED)) {
            submitDate = getRandomDate(acceptDate, mission.getEnd());
        }

        VideoInstance instance = new VideoInstance(
            getNextInstanceId(textInstanceDao.findAll(), MissionType.VIDEO),
            username,
            state,
            MissionType.VIDEO,
            acceptDate,
            submitDate,
            submitDate != null,
            mission.getMissionId(),
            0,
            0,
            submitDate == null ? 0 : random.nextInt(1000),
            "",
            null,
            mission

        );

        videoInstanceDao.save(instance);
    }

    private static long random(long begin, long end) {
        if (begin == end) {
            return begin;
        }
        long rtn = begin + (long) (Math.random() * (end - begin));
        // 如果返回的是开始时间和结束时间，则递归调用本函数查找随机值
        if (rtn == begin || rtn == end) {
            return random(begin, end);
        }
        return rtn;
    }

    private void createVideoMission(String username, MissionState missionState) {
        List<VideoMissionType> videoMissionTypes = new ArrayList<>();
        int typeSelect = random.nextInt(3);
        switch (typeSelect) {
            case 1:
                videoMissionTypes.add(VideoMissionType.WHOLE);
                break;
            case 2:
                videoMissionTypes.add(VideoMissionType.PART);
                break;
            default:
                videoMissionTypes.add(VideoMissionType.WHOLE);
                videoMissionTypes.add(VideoMissionType.PART);
        }
        VideoMission videoMission = null;
        String id = getNextMissionId(missionDao.findAll(), MissionType.VIDEO);
        if (MissionState.PENDING == missionState) {
            videoMission = new VideoMission(id, id, "test", new ArrayList<>(), missionState, notEndedDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), videoMissionTypes, new ArrayList<>());
        }
        if (MissionState.ENDED == missionState) {
            videoMission = new VideoMission(id, id, "test", new ArrayList<>(), missionState, startDate, startDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), videoMissionTypes, new ArrayList<>());
        }
        if (MissionState.ACTIVE == missionState) {
            videoMission = new VideoMission(id, id, "test", new ArrayList<>(), missionState, startDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), videoMissionTypes, new ArrayList<>());
        }
        missionDao.save(videoMission);
    }

    private void createAudioMission(String username, MissionState missionState) {
        List<AudioMissionType> audioMissionTypes = new ArrayList<>();
        int typeSelect = random.nextInt(3);
        switch (typeSelect) {
            case 1:
                audioMissionTypes.add(AudioMissionType.WHOLE);
                break;
            case 2:
                audioMissionTypes.add(AudioMissionType.PART);
                break;
            default:
                audioMissionTypes.add(AudioMissionType.WHOLE);
                audioMissionTypes.add(AudioMissionType.PART);
        }
        AudioMission audioMission = null;
        String id = getNextMissionId(missionDao.findAll(), MissionType.AUDIO);
        if (MissionState.PENDING == missionState) {
            audioMission = new AudioMission(id,id, "test", new ArrayList<>(), missionState, notEndedDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), audioMissionTypes, new ArrayList<>());
        }
        if (MissionState.ENDED == missionState) {
            audioMission = new AudioMission(id,id,  "test", new ArrayList<>(), missionState, startDate, startDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), audioMissionTypes, new ArrayList<>());
        }
        if (MissionState.ACTIVE == missionState) {
            audioMission = new AudioMission(id,id,  "test", new ArrayList<>(), missionState, startDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), audioMissionTypes, new ArrayList<>());
        }
        missionDao.save(audioMission);
    }

    private void createThreeDimensionMission(String username, MissionState missionState) {
        List<ThreeDimensionMissionType> threeDimensionMissionTypes = new ArrayList<>();
        threeDimensionMissionTypes.add(ThreeDimensionMissionType.WHOLE);
        ThreeDimensionMission threeDimensionMission = null;
        String id = getNextMissionId(missionDao.findAll(), MissionType.THREE_DIMENSION);
        if (MissionState.PENDING == missionState) {
            threeDimensionMission = new ThreeDimensionMission(id,id, "test", new ArrayList<>(), missionState, notEndedDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), ThreeDimensionMissionType.WHOLE, new ArrayList<>());
        }
        if (MissionState.ENDED == missionState) {
            threeDimensionMission = new ThreeDimensionMission(id,id, "test", new ArrayList<>(), missionState, startDate, startDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), ThreeDimensionMissionType.WHOLE, new ArrayList<>());
        }
        if (MissionState.ACTIVE == missionState) {
            threeDimensionMission = new ThreeDimensionMission(id,id, "test", new ArrayList<>(), missionState, startDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), ThreeDimensionMissionType.WHOLE, new ArrayList<>());
        }
        missionDao.save(threeDimensionMission);
    }

    private void createTextMission(String username, MissionState missionState) {
        List<TextMissionType> textMissionTypes = new ArrayList<>();
        int typeSelect = random.nextInt(3);
        switch (typeSelect) {
            case 1:
                textMissionTypes.add(TextMissionType.CLASSIFICATION);
                break;
            case 2:
                textMissionTypes.add(TextMissionType.KEYWORDS);
                break;
            default:
                textMissionTypes.add(TextMissionType.CLASSIFICATION);
                textMissionTypes.add(TextMissionType.KEYWORDS);
        }
        TextMission textMission = null;
        String id = getNextMissionId(missionDao.findAll(), MissionType.TEXT);
        if (MissionState.PENDING == missionState) {
            textMission = new TextMission(id,id, "test", new ArrayList<>(), missionState, notEndedDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, new HashSet<>(), new ArrayList<>(), new ArrayList<>());
        }
        if (MissionState.ENDED == missionState) {
            textMission = new TextMission(id,id, "test", new ArrayList<>(), missionState, startDate, startDate, "", username,
                    1, random.nextInt(10000), 1, new HashSet<>(), new ArrayList<>(), new ArrayList<>());
        }
        if (MissionState.ACTIVE == missionState) {
            textMission = new TextMission(id,id, "test", new ArrayList<>(), missionState, startDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, new HashSet<>(), new ArrayList<>(), new ArrayList<>());
        }
        missionDao.save(textMission);
    }

    private void createImageMission(String username, MissionState missionState) {
        List<ImageMissionType> imageMissionTypes = new ArrayList<>();
        int typeSelect = random.nextInt(4);
        switch (typeSelect) {
            case 1:
                imageMissionTypes.add(ImageMissionType.WHOLE);
                break;
            case 2:
                imageMissionTypes.add(ImageMissionType.DISTRICT);
                imageMissionTypes.add(ImageMissionType.PART);
                break;
            case 3:
                imageMissionTypes.add(ImageMissionType.WHOLE);
                imageMissionTypes.add(ImageMissionType.PART);
                break;
            default:
                imageMissionTypes.add(ImageMissionType.WHOLE);
                imageMissionTypes.add(ImageMissionType.DISTRICT);
        }
        ImageMission imageMission = null;
        String id= getNextMissionId(missionDao.findAll(), MissionType.IMAGE);
        if (MissionState.PENDING == missionState) {
            imageMission = new ImageMission(id,id, "test", new ArrayList<>(), missionState, notEndedDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), imageMissionTypes, new ArrayList<>());
        }
        if (MissionState.ENDED == missionState) {
            imageMission = new ImageMission(id,id, "test", new ArrayList<>(), missionState, startDate, startDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), imageMissionTypes, new ArrayList<>());
        }
        if (MissionState.ACTIVE == missionState) {
            imageMission = new ImageMission(id,id, "test", new ArrayList<>(), missionState, startDate, notEndedDate, "", username,
                    1, random.nextInt(10000), 1, false, new ArrayList<>(), new ArrayList<>(), imageMissionTypes, new ArrayList<>());
        }
        missionDao.save(imageMission);
    }

    private <T extends Mission> String getNextMissionId(List<T> missions, MissionType missionType) {
        int result = 0;
        Optional<T> latestMission = missions.stream().max((x1, x2) -> (MissionUtil.getId(x1.getMissionId()) - MissionUtil.getId(x2.getMissionId())));
        if (latestMission.isPresent()) {
            result = MissionUtil.getId(latestMission.get().getMissionId()) + 1;
        }
        return MissionUtil.addTypeToId(result, missionType);
    }

    private <T extends Instance> String getNextInstanceId(List<T> instances, MissionType missionType) {
        int result = 0;
        Optional<T> latestInstance = instances.stream().max((x1, x2) -> (MissionUtil.getId(x1.getMissionId()) - MissionUtil.getId(x2.getMissionId())));
        if (latestInstance.isPresent()) {
            result = MissionUtil.getId(latestInstance.get().getInstanceId()) + 1;
        }
        return MissionUtil.addTypeToId(result, missionType);
    }

    @Test
    public void confirmPassword() {
    }

    @Test
    public void deleteUser() {
    }

    @Test
    public void sendEmail() {
//        userDataService.sendEmail("445073309@qq.com","445073309@qq.com");
    }
}