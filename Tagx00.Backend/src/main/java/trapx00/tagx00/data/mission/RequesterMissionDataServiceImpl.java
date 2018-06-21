package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.*;
import trapx00.tagx00.data.dao.mission.instance.*;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.*;
import trapx00.tagx00.entity.mission.instance.*;
import trapx00.tagx00.entity.mission.instance.workresult.*;
import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.PathUtil;
import trapx00.tagx00.vo.mission.audio.AudioInstanceDetailVo;
import trapx00.tagx00.vo.mission.audio.AudioInstanceVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;
import trapx00.tagx00.vo.mission.text.TextInstanceDetailVo;
import trapx00.tagx00.vo.mission.text.TextInstanceVo;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionInstanceDetailVo;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionInstanceVo;
import trapx00.tagx00.vo.mission.video.VideoInstanceDetailVo;
import trapx00.tagx00.vo.mission.video.VideoInstanceVo;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RequesterMissionDataServiceImpl implements RequesterMissionDataService {

    private final MissionDao missionDao;
    private final ImageInstanceDao imageInstanceDao;
    private final ImageMissionDao imageMissionDao;
    private final TextInstanceDao textInstanceDao;
    private final TextMissionDao textMissionDao;
    private final AudioMissionDao audioMissionDao;
    private final AudioInstanceDao audioInstanceDao;
    private final VideoMissionDao videoMissionDao;
    private final VideoInstanceDao videoInstanceDao;
    private final ThreeDimensionInstanceDao threeDimensionInstanceDao;
    private final ThreeDimensionMissionDao threeDimensionMissionDao;
    private final InstanceService instanceService;

    @Autowired
    public RequesterMissionDataServiceImpl(MissionDao missionDao, ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao,
                                           TextMissionDao textMissionDao, TextInstanceDao textInstanceDao, AudioMissionDao audioMissionDao, AudioInstanceDao audioInstanceDao, VideoMissionDao videoMissionDao,
                                           VideoInstanceDao videoInstanceDao, ThreeDimensionInstanceDao threeDimensionInstanceDao,
                                           ThreeDimensionMissionDao threeDimensionMissionDao, InstanceService instanceService) {
        this.missionDao = missionDao;
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.textInstanceDao = textInstanceDao;
        this.textMissionDao = textMissionDao;
        this.audioInstanceDao = audioInstanceDao;
        this.audioMissionDao = audioMissionDao;
        this.videoInstanceDao = videoInstanceDao;
        this.videoMissionDao = videoMissionDao;
        this.threeDimensionInstanceDao = threeDimensionInstanceDao;
        this.threeDimensionMissionDao = threeDimensionMissionDao;
        this.instanceService = instanceService;
    }

    /**
     * update mission
     *
     * @param mission
     */
    @Override
    public String updateMission(Mission mission) throws SystemException {
        Mission result = missionDao.save(mission);
        if (result == null) {
            throw new SystemException();
        }
        return result.getMissionId();
    }

    /**
     * save mission
     *
     * @param mission
     */
    @Override
    public String saveMission(Mission mission) throws SystemException, IOException {
        Mission result = null;
        switch (mission.getMissionType()) {
            case IMAGE:
                mission.setMissionId(getNextId(imageMissionDao.findAll(), MissionType.IMAGE));
                if ((result = imageMissionDao.save((ImageMission) mission)) == null) {
                    throw new SystemException();
                }
                break;
            case TEXT:
                mission.setMissionId(getNextId(textMissionDao.findAll(), MissionType.TEXT));
                if ((result = textMissionDao.save((TextMission) mission)) == null) {
                    throw new SystemException();
                }
                FileOutputStream fileOut = new FileOutputStream(PathUtil.getSerPath() + "text_mission" + "_" + result.getMissionId());
                ObjectOutputStream out = new ObjectOutputStream(fileOut);
                out.writeObject(((TextMission) mission).getTextMissionSettings());
                out.close();
                fileOut.close();
                break;
            case THREE_DIMENSION:
                mission.setMissionId(getNextId(threeDimensionMissionDao.findAll(), MissionType.THREE_DIMENSION));
                if ((result = threeDimensionMissionDao.save((ThreeDimensionMission) mission)) == null) {
                    throw new SystemException();
                }
                break;
            case VIDEO:
                mission.setMissionId(getNextId(videoMissionDao.findAll(), MissionType.VIDEO));
                if ((result = videoMissionDao.save((VideoMission) mission)) == null) {
                    throw new SystemException();
                }
                break;

            case AUDIO:
                mission.setMissionId(getNextId(audioMissionDao.findAll(), MissionType.AUDIO));
                if ((result = audioMissionDao.save((AudioMission) mission)) == null) {
                    throw new SystemException();
                }
                break;
        }
        return result.getMissionId();
    }

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @param missionType
     * @return the specific MissionInstanceItemVo
     */
    @Override
    public InstanceDetailVo getInstanceByInstanceId(String instanceId, MissionType missionType) {
        try {
            switch (missionType) {
                case IMAGE:
                    ImageInstance imageInstance = instanceService.getImageInstance(instanceId);
                    if (imageInstance == null)
                        return null;
                    else {
                        int imageResultSize = 0;
                        List<ImageResult> imageResults = imageInstance.getImageResults();
                        if (imageResults != null) {
                            for (ImageResult imageResult : imageResults) {
                                if (imageResult.isDone()) {
                                    imageResultSize++;
                                }
                            }
                        }
                        return generateImageInstanceDetailVo(imageInstance, imageResultSize);
                    }
                case TEXT:
                    TextInstance textInstance = instanceService.getTextInstance(instanceId);
                    if (textInstance == null)
                        return null;
                    else {
                        int textResultSize = 0;
                        List<TextResult> textResults = textInstance.getTextResults();
                        if (textResults != null) {
                            for (TextResult textResult : textResults) {
                                if (textResult.isDone()) {
                                    textResultSize++;
                                }
                            }
                        }
                        return generateTextInstanceDetailVo(textInstance, textResultSize);
                    }
                case AUDIO:
                    AudioInstance audioInstance = instanceService.getAudioInstance(instanceId);
                    if (audioInstance == null)
                        return null;
                    else {
                        int audioResultSize = 0;
                        List<AudioResult> audioResults = audioInstance.getAudioResults();
                        if (audioResults != null) {
                            for (AudioResult audioResult : audioResults) {
                                if (audioResult.isDone()) {
                                    audioResultSize++;
                                }
                            }
                        }
                        return generateAudioInstanceDetailVo(audioInstance, audioResultSize);
                    }
                case VIDEO:
                    VideoInstance videoInstance = instanceService.getVideoInstance(instanceId);
                    if (videoInstance == null)
                        return null;
                    else {
                        int videoResultSize = 0;
                        List<VideoResult> videoResults = videoInstance.getVideoResults();
                        if (videoResults != null) {
                            for (VideoResult videoResult : videoResults) {
                                if (videoResult.isDone()) {
                                    videoResultSize++;
                                }
                            }
                        }
                        return generateVideoInstanceDetailVo(videoInstance, videoResultSize);
                    }
                case THREE_DIMENSION:
                    ThreeDimensionInstance threeDimensionInstance = instanceService.getThreeDimensionInstance(instanceId);
                    if (threeDimensionInstance == null)
                        return null;
                    else {
                        int threeDimensionResultSize = 0;
                        List<ThreeDimensionResult> threeDimensionResults = threeDimensionInstance.getThreeDimensionResults();
                        if (threeDimensionResults != null) {
                            for (ThreeDimensionResult threeDimensionResult : threeDimensionResults) {
                                if (threeDimensionResult.isDone()) {
                                    threeDimensionResultSize++;
                                }
                            }
                        }
                        return generateThreeDimensionInstanceDetailVo(threeDimensionInstance, threeDimensionResultSize);
                    }


            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public InstanceVo[] getInstancesByMissionId(String missionId, MissionType missionType) {
        try {
            ArrayList<Instance> instances = new ArrayList<>();
            InstanceVo[] instanceVos = null;
            switch (missionType) {
                case IMAGE:
                    instances.addAll(imageInstanceDao.findImageInstancesByMissionId(missionId));
                    instanceVos = new InstanceVo[instances.size()];
                    for (int i = 0; i < instanceVos.length; i++) {
                        Instance instanceVo = instances.get(i);
                        int imageResultSize = 0;
                        ImageInstance imageInstance = instanceService.getImageInstance(instanceVo.getInstanceId());
                        List<ImageResult> imageResults = imageInstance.getImageResults();
                        if (imageResults != null) {
                            for (ImageResult imageResult : imageResults) {
                                if (imageResult.isDone()) {
                                    imageResultSize++;
                                }
                            }
                        }
                        instanceVos[i] = generateImageInstanceVo(imageInstance, imageResultSize);
                    }
                    break;
                case TEXT:
                    instances.addAll(textInstanceDao.findTextInstancesByMissionId(missionId));
                    instanceVos = new InstanceVo[instances.size()];
                    for (int i = 0; i < instanceVos.length; i++) {
                        Instance instanceVo = instances.get(i);
                        int textResultSize = 0;
                        TextInstance textInstance = instanceService.getTextInstance(instanceVo.getInstanceId());
                        List<TextResult> textResults = textInstance.getTextResults();
                        if (textResults != null) {
                            for (TextResult textResult : textResults) {
                                if (textResult.isDone()) {
                                    textResultSize++;
                                }
                            }
                        }
                        instanceVos[i] = generateTextInstanceVo(textInstance, textResultSize);
                    }
                    break;
                case THREE_DIMENSION:
                    instances.addAll(threeDimensionInstanceDao.findThreeDimensionInstancesByMissionId(missionId));
                    instanceVos = new InstanceVo[instances.size()];
                    for (int i = 0; i < instanceVos.length; i++) {
                        Instance instanceVo = instances.get(i);
                        int threeDimensionResultSize = 0;
                        ThreeDimensionInstance threeDimensionInstance = instanceService.getThreeDimensionInstance(instanceVo.getInstanceId());
                        List<ThreeDimensionResult> threeDimensionResults = threeDimensionInstance.getThreeDimensionResults();
                        if (threeDimensionResults != null) {
                            for (ThreeDimensionResult threeDimensionResult : threeDimensionResults) {
                                if (threeDimensionResult.isDone()) {
                                    threeDimensionResultSize++;
                                }
                            }
                        }
                        instanceVos[i] = generateThreeDimensionInstanceVo(threeDimensionInstance, threeDimensionResultSize);
                    }
                    break;
                case VIDEO:
                    instances.addAll(videoInstanceDao.findVideoInstancesByMissionId(missionId));
                    instanceVos = new InstanceVo[instances.size()];
                    for (int i = 0; i < instanceVos.length; i++) {
                        Instance instanceVo = instances.get(i);
                        int videoResultSize = 0;
                        VideoInstance videoInstance = instanceService.getVideoInstance(instanceVo.getInstanceId());
                        List<VideoResult> videoResults = videoInstance.getVideoResults();
                        if (videoResults != null) {
                            for (VideoResult videoResult : videoResults) {
                                if (videoResult.isDone()) {
                                    videoResultSize++;
                                }
                            }
                        }
                        instanceVos[i] = generateVideoInstanceVo(videoInstance, videoResultSize);
                    }
                    break;
                case AUDIO:
                    instances.addAll(audioInstanceDao.findAudioInstancesByMissionId(missionId));
                    instanceVos = new InstanceVo[instances.size()];
                    for (int i = 0; i < instanceVos.length; i++) {
                        Instance instanceVo = instances.get(i);
                        int audioResultSize = 0;
                        AudioInstance audioInstance = instanceService.getAudioInstance(instanceVo.getInstanceId());
                        List<AudioResult> audioResults = audioInstance.getAudioResults();
                        if (audioResults != null) {
                            for (AudioResult videoResult : audioResults) {
                                if (videoResult.isDone()) {
                                    audioResultSize++;
                                }
                            }
                        }
                        instanceVos[i] = generateAudioInstanceVo(audioInstance, audioResultSize);
                    }
                    break;
            }
            return instanceVos;
        } catch (Exception e) {
            e.printStackTrace();
            return new InstanceVo[0];
        }
    }

    /**
     * get all instances
     *
     * @return the instances
     */
    @Override
    public InstanceVo[] getAllInstances(String username) {
        ArrayList<InstanceVo> result = new ArrayList<>();

        for (ImageInstance imageInstance : imageInstanceDao.findAll()) {
            int imageResultSize = 0;
            try {
                ImageInstance real = instanceService.getImageInstance(imageInstance.getInstanceId());
                if (real.getImageMission().getRequesterUsername().equals(username)) {
                    List<ImageResult> imageResults = real.getImageResults();
                    for (ImageResult imageResult : imageResults) {
                        if (imageResult.isDone()) {
                            imageResultSize++;
                        }
                    }
                    result.add(generateImageInstanceVo(real, imageResultSize));
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        for (TextInstance textInstance : textInstanceDao.findAll()) {
            int textResultSize = 0;
            try {
                TextInstance real = instanceService.getTextInstance(textInstance.getInstanceId());
                if (real.getTextMission().getRequesterUsername().equals(username)) {
                    List<TextResult> textResults = real.getTextResults();
                    for (TextResult textResult : textResults) {
                        if (textResult.isDone())
                            textResultSize++;
                    }
                    result.add(generateTextInstanceVo(real, textResultSize));
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        for (AudioInstance audioInstance : audioInstanceDao.findAll()) {
            int audioResultSize = 0;
            try {
                AudioInstance real = instanceService.getAudioInstance(audioInstance.getInstanceId());
                if (real.getAudioMission().getRequesterUsername().equals(username)) {
                    List<AudioResult> audioResults = real.getAudioResults();
                    for (AudioResult textResult : audioResults) {
                        if (textResult.isDone())
                            audioResultSize++;
                    }
                    result.add(generateAudioInstanceVo(real, audioResultSize));
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        for (VideoInstance videoInstance : videoInstanceDao.findAll()) {
            try {
                int videoResultSize = 0;
                VideoInstance real = instanceService.getVideoInstance(videoInstance.getInstanceId());
                if (real.getVideoMission().getRequesterUsername().equals(username)) {
                    List<VideoResult> videoResults = real.getVideoResults();
                    for (VideoResult textResult : videoResults) {
                        if (textResult.isDone())
                            videoResultSize++;
                    }
                    result.add(generateVideoInstanceVo(real, videoResultSize));
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        for (ThreeDimensionInstance threeDimensionInstance : threeDimensionInstanceDao.findAll()) {
            int threeDimensionResultSize = 0;
            try {
                ThreeDimensionInstance real = instanceService.getThreeDimensionInstance(threeDimensionInstance.getInstanceId());
                if (real.getThreeDimensionMission().getRequesterUsername().equals(username)) {
                    List<ThreeDimensionResult> threeDimensionResults = real.getThreeDimensionResults();
                    for (ThreeDimensionResult threeDimensionResult : threeDimensionResults) {
                        if (threeDimensionResult.isDone())
                            threeDimensionResultSize++;
                    }
                    result.add(generateThreeDimensionInstanceVo(real, threeDimensionResultSize));
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result.toArray(new InstanceVo[result.size()]);
    }

    /**
     * get mission by id
     *
     * @param missionId
     * @return
     */
    @Override
    public Mission getMissionByMissionId(String missionId) throws MissionIdDoesNotExistException, ClassNotFoundException {
        Optional<Mission> optionalMission = missionDao.findById(missionId);
        if (optionalMission.isPresent()) {
            Mission mission = optionalMission.get();
            if (mission.getMissionType() == MissionType.TEXT) {
                try {
                    FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "text_mission" + "_" + mission.getMissionId());
                    ObjectInputStream in = new ObjectInputStream(fileIn);
                    List<TextMissionSetting> textMissionSettings = (List<TextMissionSetting>) in.readObject();
                    in.close();
                    fileIn.close();
                    ((TextMission) mission).setTextMissionSettings(textMissionSettings);
                } catch (IOException e) {
                    ((TextMission) mission).setTextMissionSettings(new ArrayList<>());
                }
            }
            return mission;
        } else {
            throw new MissionIdDoesNotExistException();
        }
    }

    /**
     * update the mission's credits
     *
     * @param missionId
     * @param credits
     */
    @Override
    public void updateMission(String missionId, int credits, MissionType missionType) throws SystemException, IOException, MissionIdDoesNotExistException, ClassNotFoundException {
        Mission mission = null;
        switch (missionType) {
            case IMAGE:
                mission = imageMissionDao.findImageMissionByMissionId(missionId);
                break;
            case TEXT:
                mission = getMissionByMissionId(missionId);
                break;
            case AUDIO:
                mission = audioMissionDao.findAudioMissionByMissionId(missionId);
                break;
            case VIDEO:
                mission = videoMissionDao.findVideoMissionByMissionId(missionId);
                break;
            case THREE_DIMENSION:
                mission = threeDimensionMissionDao.findTHreeDimensionMissionByMissionId(missionId);
                break;

        }
        mission.setCredits(mission.getCredits() + credits);
        updateMission(mission);
    }

    /**
     * finlize the instance
     *
     * @param instanceId
     * @param missionFinalizeVo
     */
    @Override
    public void updateInstance(String instanceId, MissionFinalizeVo missionFinalizeVo, MissionType missionType) throws SystemException {
        Instance instance = null;
        Mission mission = null;
        String missionId;
        switch (missionType) {
            case IMAGE:
                instance = imageInstanceDao.findImageInstanceByInstanceId(instanceId);
                missionId = instance.getMissionId();
                mission = imageMissionDao.findImageMissionByMissionId(missionId);
                break;
            case TEXT:
                instance = textInstanceDao.findTextInstanceByInstanceId(instanceId);
                missionId = instance.getMissionId();
                mission = textMissionDao.findTextMissionByMissionId(missionId);
                break;
            case THREE_DIMENSION:
                instance = threeDimensionInstanceDao.findThreeDimensionInstanceByInstanceId(instanceId);
                missionId = instance.getMissionId();
                mission = threeDimensionMissionDao.findTHreeDimensionMissionByMissionId(missionId);
                break;
            case VIDEO:
                instance = videoInstanceDao.findVideoInstanceByInstanceId(instanceId);
                missionId = instance.getMissionId();
                mission = videoMissionDao.findVideoMissionByMissionId(missionId);
                break;
            case AUDIO:
                instance = audioInstanceDao.findAudioInstanceByInstanceId(instanceId);
                missionId = instance.getMissionId();
                mission = audioMissionDao.findAudioMissionByMissionId(missionId);
                break;
        }
        instance.setMissionInstanceState(MissionInstanceState.FINALIZED);
        instance.setComment(missionFinalizeVo.getComment());
        instance.setExpRatio(missionFinalizeVo.getExpRatio());
        instance.setExp(missionFinalizeVo.getExpRatio() * mission.getLevel() * 20);
        instance.setCredits(missionFinalizeVo.getCredits());
        switch (instance.getMissionType()) {
            case IMAGE:
                if (imageInstanceDao.save((ImageInstance) instance) == null) {
                    throw new SystemException();
                }
                break;
            case TEXT:
                if (textInstanceDao.save((TextInstance) instance) == null) {
                    throw new SystemException();
                }
                break;
            case AUDIO:
                if (audioInstanceDao.save((AudioInstance) instance) == null) {
                    throw new SystemException();
                }
                break;
            case VIDEO:
                if (videoInstanceDao.save((VideoInstance) instance) == null) {
                    throw new SystemException();
                }
                break;
            case THREE_DIMENSION:
                if (threeDimensionInstanceDao.save((ThreeDimensionInstance) instance) == null) {
                    throw new SystemException();
                }
                break;

        }
    }

    /**
     * get the latest mission's id
     *
     * @param missionType
     * @return
     */
    @Override
    public int getLatestMissionId(MissionType missionType) {

        return 0;
    }

    private ImageInstanceDetailVo generateImageInstanceDetailVo(ImageInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), imageInstance.getMissionId(), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new ImageInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getImageResults());
    }

    private AudioInstanceDetailVo generateAudioInstanceDetailVo(AudioInstance audioInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(audioInstance.getInstanceId(), audioInstance.getExpRatio(), audioInstance.getExp(), audioInstance.getCredits(), audioInstance.getComment(), audioInstance.getWorkerUsername(), audioInstance.getMissionInstanceState(), audioInstance.getMissionId(), audioInstance.getAcceptDate(), audioInstance.getSubmitDate(), audioInstance.isSubmitted(), completedCounts);
        return new AudioInstanceDetailVo(audioInstance.getMissionType(), instanceVo, audioInstance.getAudioResults());
    }

    private VideoInstanceDetailVo generateVideoInstanceDetailVo(VideoInstance audioInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(audioInstance.getInstanceId(), audioInstance.getExpRatio(), audioInstance.getExp(), audioInstance.getCredits(), audioInstance.getComment(), audioInstance.getWorkerUsername(), audioInstance.getMissionInstanceState(), audioInstance.getMissionId(), audioInstance.getAcceptDate(), audioInstance.getSubmitDate(), audioInstance.isSubmitted(), completedCounts);
        return new VideoInstanceDetailVo(audioInstance.getMissionType(), instanceVo, audioInstance.getVideoResults());
    }

    private ThreeDimensionInstanceDetailVo generateThreeDimensionInstanceDetailVo(ThreeDimensionInstance audioInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(audioInstance.getInstanceId(), audioInstance.getExpRatio(), audioInstance.getExp(), audioInstance.getCredits(), audioInstance.getComment(), audioInstance.getWorkerUsername(), audioInstance.getMissionInstanceState(), audioInstance.getMissionId(), audioInstance.getAcceptDate(), audioInstance.getSubmitDate(), audioInstance.isSubmitted(), completedCounts);
        return new ThreeDimensionInstanceDetailVo(audioInstance.getMissionType(), instanceVo, audioInstance.getThreeDimensionResults());
    }

    private ImageInstanceVo generateImageInstanceVo(ImageInstance imageInstance, int completedCounts) {
        return new ImageInstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(),
            imageInstance.getMissionInstanceState(), imageInstance.getMissionId(),
            imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts
        );
    }

    private TextInstanceDetailVo generateTextInstanceDetailVo(TextInstance textinstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(textinstance.getInstanceId(), textinstance.getExpRatio(), textinstance.getExp(), textinstance.getCredits(), textinstance.getComment(), textinstance.getWorkerUsername(), textinstance.getMissionInstanceState(), textinstance.getMissionId(), textinstance.getAcceptDate(), textinstance.getSubmitDate(), textinstance.isSubmitted(), completedCounts);
        return new TextInstanceDetailVo(textinstance.getMissionType(), instanceVo, textinstance.getTextResults());
    }

    private TextInstanceVo generateTextInstanceVo(Instance instance, int completedCounts) {
        return new TextInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
            instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
            instance.isSubmitted(), completedCounts);
    }

    private ThreeDimensionInstanceVo generateThreeDimensionInstanceVo(Instance instance, int completedCounts) {
        return new ThreeDimensionInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
            instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
            instance.isSubmitted(), completedCounts);
    }

    private VideoInstanceVo generateVideoInstanceVo(Instance instance, int completedCounts) {
        return new VideoInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
            instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
            instance.isSubmitted(), completedCounts);
    }

    private AudioInstanceVo generateAudioInstanceVo(Instance instance, int completedCounts) {
        return new AudioInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
            instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
            instance.isSubmitted(), completedCounts);
    }

    private <T extends Mission> String getNextId(List<T> missions, MissionType missionType) {
        int result = 0;
        Optional<T> latestMission = missions.stream().max((x1, x2) -> (MissionUtil.getId(x1.getMissionId()) - MissionUtil.getId(x2.getMissionId())));
        if (latestMission.isPresent()) {
            result = MissionUtil.getId(latestMission.get().getMissionId()) + 1;
        }
        return MissionUtil.addTypeToId(result, missionType);
    }

}
