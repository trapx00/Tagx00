package trapx00.tagx00.data.mission;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;
import trapx00.tagx00.data.dao.mission.*;
import trapx00.tagx00.data.dao.mission.instance.*;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.*;
import trapx00.tagx00.entity.mission.instance.*;
import trapx00.tagx00.entity.mission.instance.workresult.*;
import trapx00.tagx00.exception.viewexception.MissionAlreadyAcceptedException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.util.ApiUtil;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.PathUtil;
import trapx00.tagx00.vo.mission.audio.AudioInstanceDetailVo;
import trapx00.tagx00.vo.mission.audio.AudioInstanceVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.image.ImageInstanceVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.text.TextInstanceDetailVo;
import trapx00.tagx00.vo.mission.text.TextInstanceVo;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionInstanceDetailVo;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionInstanceVo;
import trapx00.tagx00.vo.mission.video.VideoInstanceDetailVo;
import trapx00.tagx00.vo.mission.video.VideoInstanceVo;
import trapx00.tagx00.vo.ml.RecommendTagItem;
import trapx00.tagx00.vo.ml.RecommendTagsVo;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkerMissionDataServiceImpl implements WorkerMissionDataService {
    @Value("${aliyun.akId}")
    private String akId;
    @Value("${aliyun.akSecret}")
    private String akSecret;
    @Value("${aliyun.imageHostUrl}")
    private String imageHostUrl;
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
    private final PythonService pythonService;

    @Autowired
    public WorkerMissionDataServiceImpl(ImageInstanceDao imageInstanceDao, ImageMissionDao imageMissionDao,
                                        TextMissionDao textMissionDao, TextInstanceDao textInstanceDao
            , AudioMissionDao audioMissionDao, AudioInstanceDao audioInstanceDao, VideoMissionDao videoMissionDao,
                                        VideoInstanceDao videoInstanceDao, ThreeDimensionInstanceDao threeDimensionInstanceDao,
                                        ThreeDimensionMissionDao threeDimensionMissionDao, PythonService pythonService) {
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
        this.pythonService = pythonService;
    }

    /**
     * update the progress of the instance.
     *
     * @param
     */
    @Override
    public String updateInstanceDetailVo(InstanceDetailVo instanceDetailVo) throws SystemException, IOException {
        MissionType missionType = instanceDetailVo.getMissionType();
        InstanceVo instanceVo = instanceDetailVo.getInstance();
        Instance result = null;

        switch (missionType) {
            case IMAGE:
                ImageInstanceDetailVo imageInstanceDetailVo = (ImageInstanceDetailVo) instanceDetailVo;
                ImageInstance imageInstance = generateImageInstance(instanceVo, imageInstanceDetailVo);
                result = saveImageInstance(imageInstance);
                break;
            case TEXT:
                TextInstanceDetailVo textInstanceDetailVo = (TextInstanceDetailVo) instanceDetailVo;
                TextInstance textInstance = generateTextInstance(instanceVo, textInstanceDetailVo);
                result = saveTextInstance(textInstance);
                break;
            case THREE_DIMENSION:
                ThreeDimensionInstanceDetailVo threeDimensionInstanceDetailVo = (ThreeDimensionInstanceDetailVo) instanceDetailVo;
                ThreeDimensionInstance threeDimensionInstance = generateThreeDimensionInstance(instanceVo, threeDimensionInstanceDetailVo);
                result = saveThreeDimensionInstance(threeDimensionInstance);
                break;
            case VIDEO:
                VideoInstanceDetailVo videoInstanceDetailVo = (VideoInstanceDetailVo) instanceDetailVo;
                VideoInstance videoInstance = generateVideoInstance(instanceVo, videoInstanceDetailVo);
                result = saveVideoInstance(videoInstance);
                break;
            case AUDIO:
                AudioInstanceDetailVo audioInstanceDetailVo = (AudioInstanceDetailVo) instanceDetailVo;
                AudioInstance audioInstance = generateAudioInstance(instanceVo, audioInstanceDetailVo);
                result = saveAudioInstance(audioInstance);
                break;

        }
        if (result == null)
            throw new SystemException();
        return result.getInstanceId();
    }

    /**
     * save the progress of the instance.
     * update instance
     * also use to abort the instance
     *
     * @param instanceDetailVo
     */
    @Override
    public String saveInstanceDetailVo(InstanceDetailVo instanceDetailVo) throws SystemException, MissionAlreadyAcceptedException, IOException {
        MissionType missionType = instanceDetailVo.getMissionType();
        InstanceVo instanceVo = instanceDetailVo.getInstance();
        Instance result = null;

        switch (missionType) {
            case IMAGE:
                ImageInstanceDetailVo imageInstanceDetailVo = (ImageInstanceDetailVo) instanceDetailVo;
                ImageInstance imageInstance = generateImageInstance(instanceVo, imageInstanceDetailVo);
                imageInstance.setInstanceId(getNextId(imageInstanceDao.findAll(), MissionType.IMAGE));
                result = saveImageInstance(imageInstance);
                break;
            case TEXT:
                TextInstanceDetailVo textInstanceDetailVo = (TextInstanceDetailVo) instanceDetailVo;
                TextInstance textInstance = generateTextInstance(instanceVo, textInstanceDetailVo);
                textInstance.setInstanceId(getNextId(textInstanceDao.findAll(), MissionType.TEXT));
                result = saveTextInstance(textInstance);
                break;
            case AUDIO:
                AudioInstanceDetailVo audioInstanceDetailVo = (AudioInstanceDetailVo) instanceDetailVo;
                AudioInstance audioInstance = generateAudioInstance(instanceVo, audioInstanceDetailVo);
                audioInstance.setInstanceId(getNextId(audioInstanceDao.findAll(), MissionType.AUDIO));
                result = saveAudioInstance(audioInstance);
                break;
            case VIDEO:
                VideoInstanceDetailVo videoInstanceDetailVo = (VideoInstanceDetailVo) instanceDetailVo;
                VideoInstance videoInstance = generateVideoInstance(instanceVo, videoInstanceDetailVo);
                videoInstance.setInstanceId(getNextId(videoInstanceDao.findAll(), MissionType.VIDEO));
                result = saveVideoInstance(videoInstance);
                break;
            case THREE_DIMENSION:
                ThreeDimensionInstanceDetailVo threeDimensionInstanceDetailVo = (ThreeDimensionInstanceDetailVo) instanceDetailVo;
                ThreeDimensionInstance threeDimensionInstance = generateThreeDimensionInstance(instanceVo, threeDimensionInstanceDetailVo);
                threeDimensionInstance.setInstanceId(getNextId(threeDimensionInstanceDao.findAll(), MissionType.THREE_DIMENSION));
                result = saveThreeDimensionInstance(threeDimensionInstance);
                break;
        }
        if (result == null)
            throw new SystemException();
        return result.getInstanceId();
    }

    /**
     * save the instance
     *
     * @param instanceId
     * @param missionType
     */
    @Override
    public int abortInstance(String instanceId, MissionType missionType) throws IOException {
        switch (missionType) {
            case IMAGE:
                ImageInstance imageInstance = imageInstanceDao.findImageInstanceByInstanceId(instanceId);
                imageInstance.setMissionInstanceState(MissionInstanceState.ABANDONED);
                saveImageInstance(imageInstance);
                break;
            case TEXT:
                TextInstance textInstance = textInstanceDao.findTextInstanceByInstanceId(instanceId);
                textInstance.setMissionInstanceState(MissionInstanceState.ABANDONED);
                saveTextInstance(textInstance);
                break;
            case THREE_DIMENSION:
                ThreeDimensionInstance threeDimensionInstance = threeDimensionInstanceDao.findThreeDimensionInstanceByInstanceId(instanceId);
                threeDimensionInstance.setMissionInstanceState(MissionInstanceState.ABANDONED);
                saveThreeDimensionInstance(threeDimensionInstance);
                break;
            case VIDEO:
                VideoInstance videoInstance = videoInstanceDao.findVideoInstanceByInstanceId(instanceId);
                videoInstance.setMissionInstanceState(MissionInstanceState.ABANDONED);
                videoInstanceDao.save(videoInstance);
                break;
            case AUDIO:
                AudioInstance audioInstance = audioInstanceDao.findAudioInstanceByInstanceId(instanceId);
                audioInstance.setMissionInstanceState(MissionInstanceState.ABANDONED);
                audioInstanceDao.save(audioInstance);
                break;
        }
        return 0;
    }


    /**
     * get mission id by username
     *
     * @param workerUsername
     * @return the list of  the MissionWorkerQueryItemVo
     */
    @Override
    public InstanceVo[] getInstanceByWorkerUsername(String workerUsername) {

        //获得每个种类的instance列表
        ArrayList<Instance> instances = new ArrayList<>(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));
        instances.addAll(textInstanceDao.findTextInstancesByWorkerUsername(workerUsername));
        instances.addAll(videoInstanceDao.findVideoInstancesByWorkerUsername(workerUsername));
        instances.addAll(audioInstanceDao.findAudioInstancesByWorkerUsername(workerUsername));
        instances.addAll(threeDimensionInstanceDao.findThreeDimensionInstancesByWorkerUsername(workerUsername));

        InstanceVo[] instanceVos = new InstanceVo[instances.size()];
        try {
            for (int i = 0; i < instances.size(); i++) {
                Instance instance = instances.get(i);
                int instanceResultIdsSize = 0;
                switch (instance.getMissionType()) {
                    case IMAGE:
                        List<ImageResult> imageResults = getImageInstance(instance.getInstanceId()).getImageResults();
                        for (ImageResult imageResult : imageResults) {
                            if (imageResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        instanceVos[i] = generateImageInstanceVo(instance, instanceResultIdsSize);
                        break;
                    case TEXT:
                        List<TextResult> textResults = getTextInstance(instance.getInstanceId()).getTextResults();
                        for (TextResult textResult : textResults) {
                            if (textResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        instanceVos[i] = generateTextInstanceVo(instance, instanceResultIdsSize);
                        break;
                    case AUDIO:
                        List<AudioResult> audioResults = getAudioInstance(instance.getInstanceId()).getAudioResults();
                        for (AudioResult audioResult : audioResults) {
                            if (audioResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        instanceVos[i] = generateAudioInstanceVo(instance, instanceResultIdsSize);
                        break;
                    case VIDEO:
                        List<VideoResult> videoResults = getVideoInstance(instance.getInstanceId()).getVideoResults();
                        for (VideoResult videoResult : videoResults) {
                            if (videoResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        instanceVos[i] = generateVideoInstanceVo(instance, instanceResultIdsSize);
                        break;
                    case THREE_DIMENSION:
                        List<ThreeDimensionResult> threeDimensionResults = getThreeDimensionInstance(instance.getInstanceId()).getThreeDimensionResults();
                        for (ThreeDimensionResult threeDimensionResult : threeDimensionResults) {
                            if (threeDimensionResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        instanceVos[i] = generateThreeDimensionInstanceVo(instance, instanceResultIdsSize);
                        break;
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return instanceVos;

    }

    /**
     * get the information of instance by username and missionId
     *
     * @param workerUsername
     * @param missionId
     * @param missionType
     * @return the instance matching username and missionId
     */
    @Override
    public InstanceDetailVo getInstanceDetailVoByUsernameAndMissionId(String workerUsername, String missionId, MissionType missionType) throws IOException, ClassNotFoundException, SystemException {

        //获得每个种类的instance列表
        ArrayList<Instance> instances = new ArrayList<>(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));
        instances.addAll(textInstanceDao.findTextInstancesByWorkerUsername(workerUsername));
        instances.addAll(videoInstanceDao.findVideoInstancesByWorkerUsername(workerUsername));
        instances.addAll(audioInstanceDao.findAudioInstancesByWorkerUsername(workerUsername));
        instances.addAll(threeDimensionInstanceDao.findThreeDimensionInstancesByWorkerUsername(workerUsername));

        for (Instance instance1 : instances) {
            if (instance1.getMissionId().equals(missionId) && instance1.getMissionType() == missionType) {
                int instanceResultIdsSize = 0;
                switch (instance1.getMissionType()) {
                    case IMAGE:
                        ImageInstance imageInstance = getImageInstance(instance1.getInstanceId());
                        List<ImageResult> imageResults = imageInstance.getImageResults();
                        for (ImageResult imageResult : imageResults) {
                            if (imageResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        return generateImageInstanceDetailVo(imageInstance, instanceResultIdsSize);
                    case TEXT:
                        TextInstance textInstance = getTextInstance(instance1.getInstanceId());
                        List<TextResult> textResults = textInstance.getTextResults();
                        for (TextResult textResult : textResults) {
                            if (textResult.isDone())
                                instanceResultIdsSize++;
                        }
                        return generateTextInstanceDetailVo(textInstance, instanceResultIdsSize);
                    case THREE_DIMENSION:
                        ThreeDimensionInstance threeDimensionInstance = getThreeDimensionInstance(instance1.getInstanceId());
                        List<ThreeDimensionResult> threeDimensionResults = threeDimensionInstance.getThreeDimensionResults();
                        for (ThreeDimensionResult threeDimensionResult : threeDimensionResults) {
                            if (threeDimensionResult.isDone()) {
                                instanceResultIdsSize++;
                            }
                        }
                        return generateThreeDimensionInstanceDetailVo(threeDimensionInstance, instanceResultIdsSize);
                    case VIDEO:
                        VideoInstance videoInstance = getVideoInstance(instance1.getInstanceId());
                        List<VideoResult> videoResults = videoInstance.getVideoResults();
                        for (VideoResult videoResult : videoResults) {
                            if (videoResult.isDone())
                                instanceResultIdsSize++;
                        }
                        return generateVideoInstanceDetailVo(videoInstance, instanceResultIdsSize);
                    case AUDIO:
                        AudioInstance audioInstance = getAudioInstance(instance1.getInstanceId());
                        List<AudioResult> audioResults = audioInstance.getAudioResults();
                        for (AudioResult audioResult : audioResults) {
                            if (audioResult.isDone())
                                instanceResultIdsSize++;
                        }
                        return generateAudioInstanceDetailVo(audioInstance, instanceResultIdsSize);
                }
            }
        }
        return null;
    }

    /**
     * get the information of  instance by username and missionId
     *
     * @param workerUsername
     * @param missionId
     * @param missionType
     * @return the instance matching username and missionId
     */
    @Override
    public Instance getInstanceByUsernameAndMissionId(String workerUsername, String missionId, MissionType missionType) {

        //获得每个种类的instance列表
        ArrayList<Instance> instances = new ArrayList<>(imageInstanceDao.findImageInstancesByWorkerUsername(workerUsername));
        instances.addAll(textInstanceDao.findTextInstancesByWorkerUsername(workerUsername));
        instances.addAll(videoInstanceDao.findVideoInstancesByMissionId(workerUsername));
        instances.addAll(audioInstanceDao.findAudioInstancesByMissionId(workerUsername));
        instances.addAll(threeDimensionInstanceDao.findThreeDimensionInstancesByWorkerUsername(workerUsername));

        for (Instance instance1 : instances) {
            if (instance1.getMissionId().equals(missionId) && instance1.getMissionType() == missionType)
                return instance1;
        }
        return null;
    }

    @Override
    public boolean deleteInstanceByMissionIdAndUsername(String missionId, String username, MissionType missionType) throws IOException, ClassNotFoundException, SystemException {
        InstanceDetailVo instanceDetailVo = this.getInstanceDetailVoByUsernameAndMissionId(username, missionId, missionType);
        switch (instanceDetailVo.getMissionType()) {
            case IMAGE:
                imageInstanceDao.deleteById(instanceDetailVo.getInstance().getInstanceId());
                break;
            case TEXT:
                textInstanceDao.deleteById(instanceDetailVo.getInstance().getInstanceId());
                break;
            case AUDIO:
                audioInstanceDao.deleteById(instanceDetailVo.getInstance().getInstanceId());
                break;
            case VIDEO:
                videoInstanceDao.deleteById(instanceDetailVo.getInstance().getInstanceId());
                break;
            case THREE_DIMENSION:
                threeDimensionInstanceDao.deleteById(instanceDetailVo.getInstance().getInstanceId());
                break;
        }
        return true;
    }

    /**
     * identify the image
     *
     * @param bytes
     * @return
     */
    @Override
    public JSONArray identifyImage(byte[] bytes) throws SystemException {
        BASE64Encoder base64Encoder = new BASE64Encoder();
        String bodys = "{\"type\":1," +
                "\"content\":\"" + base64Encoder.encode(bytes) + "\"}";
        try {
            return (JSONArray) JSONObject.fromObject(ApiUtil.sendPost(imageHostUrl, bodys, akId, akSecret)).get("tags");
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    private ImageInstance generateImageInstance(InstanceVo instanceVo, ImageInstanceDetailVo instanceDetailVo) {
        ImageMission imageMission = imageMissionDao.findImageMissionByMissionId(instanceVo.getMissionId());
        List<ImageResult> imageResults = instanceDetailVo.getImageResults() == null ? new ArrayList<>() : instanceDetailVo.getImageResults();
        return new ImageInstance(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(),
                instanceVo.getMissionInstanceState(), MissionType.IMAGE,
                instanceVo.getAcceptDate(), instanceVo.getSubmitDate(),
                instanceVo.isSubmitted(), instanceVo.getMissionId(), instanceVo.getExp(),
                instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(), imageResults, imageMission);
    }

    private TextInstance generateTextInstance(InstanceVo instanceVo, TextInstanceDetailVo instanceDetailVo) {
        TextMission textMission = textMissionDao.findTextMissionByMissionId(instanceVo.getMissionId());
        List<TextResult> textResults = instanceDetailVo.getTextResults() == null ? new ArrayList<>() : instanceDetailVo.getTextResults();
        return new TextInstance(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(), instanceVo.getMissionInstanceState(),
                MissionType.TEXT, instanceVo.getAcceptDate(), instanceVo.getSubmitDate(),
                instanceVo.isSubmitted(), instanceVo.getMissionId(), instanceVo.getExp(),
                instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(),
                textResults, textMission);
    }

    private VideoInstance generateVideoInstance(InstanceVo instanceVo, VideoInstanceDetailVo instanceDetailVo) {
        VideoMission videoMission = videoMissionDao.findVideoMissionByMissionId(instanceVo.getMissionId());
        List<VideoResult> textResults = instanceDetailVo.getResultList() == null ? new ArrayList<>() : instanceDetailVo.getResultList();
        return new VideoInstance(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(), instanceVo.getMissionInstanceState(),
                MissionType.VIDEO, instanceVo.getAcceptDate(), instanceVo.getSubmitDate(),
                instanceVo.isSubmitted(), instanceVo.getMissionId(), instanceVo.getExp(),
                instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(),
                textResults, videoMission);
    }

    private ThreeDimensionInstance generateThreeDimensionInstance(InstanceVo instanceVo, ThreeDimensionInstanceDetailVo instanceDetailVo) {
        ThreeDimensionMission threeDimensionMission = threeDimensionMissionDao.findTHreeDimensionMissionByMissionId(instanceVo.getMissionId());
        List<ThreeDimensionResult> threeDimensionResults = instanceDetailVo.getResultList() == null ? new ArrayList<>() : instanceDetailVo.getResultList();
        return new ThreeDimensionInstance(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(), instanceVo.getMissionInstanceState(),
                MissionType.THREE_DIMENSION, instanceVo.getAcceptDate(), instanceVo.getSubmitDate(),
                instanceVo.isSubmitted(), instanceVo.getMissionId(), instanceVo.getExp(),
                instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(),
                threeDimensionResults, threeDimensionMission);
    }

    private AudioInstance generateAudioInstance(InstanceVo instanceVo, AudioInstanceDetailVo instanceDetailVo) {
        AudioMission audioMission = audioMissionDao.findAudioMissionByMissionId(instanceVo.getMissionId());
        List<AudioResult> audioResults = instanceDetailVo.getResultList() == null ? new ArrayList<>() : instanceDetailVo.getResultList();
        return new AudioInstance(instanceVo.getInstanceId(), instanceVo.getWorkerUsername(), instanceVo.getMissionInstanceState(),
                MissionType.AUDIO, instanceVo.getAcceptDate(), instanceVo.getSubmitDate(),
                instanceVo.isSubmitted(), instanceVo.getMissionId(), instanceVo.getExp(),
                instanceVo.getExpRatio(), instanceVo.getCredits(), instanceVo.getComment(),
                audioResults, audioMission);
    }

    private ImageInstanceVo generateImageInstanceVo(Instance instance, int completedCounts) {
        return new ImageInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
                instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
                instance.isSubmitted(), completedCounts);
    }

    private AudioInstanceVo generateAudioInstanceVo(Instance instance, int completedCounts) {
        return new AudioInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
                instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
                instance.isSubmitted(), completedCounts);
    }

    private VideoInstanceVo generateVideoInstanceVo(Instance instance, int completedCounts) {
        return new VideoInstanceVo(instance.getInstanceId(), instance.getExpRatio(), instance.getExp(), instance.getCredits(), instance.getComment(), instance.getWorkerUsername(), instance.getMissionInstanceState(),
                instance.getMissionId(), instance.getAcceptDate(), instance.getSubmitDate(),
                instance.isSubmitted(), completedCounts);
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

    private ImageInstanceDetailVo generateImageInstanceDetailVo(ImageInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), imageInstance.getMissionId(), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new ImageInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getImageResults());
    }

    private VideoInstanceDetailVo generateVideoInstanceDetailVo(VideoInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), imageInstance.getMissionId(), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new VideoInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getVideoResults());
    }

    private AudioInstanceDetailVo generateAudioInstanceDetailVo(AudioInstance imageInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(imageInstance.getInstanceId(), imageInstance.getExpRatio(), imageInstance.getExp(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), imageInstance.getMissionId(), imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), completedCounts);
        return new AudioInstanceDetailVo(imageInstance.getMissionType(), instanceVo, imageInstance.getAudioResults());
    }

    private ThreeDimensionInstanceDetailVo generateThreeDimensionInstanceDetailVo(ThreeDimensionInstance audioInstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(audioInstance.getInstanceId(), audioInstance.getExpRatio(), audioInstance.getExp(), audioInstance.getCredits(), audioInstance.getComment(), audioInstance.getWorkerUsername(), audioInstance.getMissionInstanceState(), audioInstance.getMissionId(), audioInstance.getAcceptDate(), audioInstance.getSubmitDate(), audioInstance.isSubmitted(), completedCounts);
        return new ThreeDimensionInstanceDetailVo(audioInstance.getMissionType(), instanceVo, audioInstance.getThreeDimensionResults());
    }

    private TextInstanceDetailVo generateTextInstanceDetailVo(TextInstance textinstance, int completedCounts) {
        InstanceVo instanceVo = new InstanceVo(textinstance.getInstanceId(), textinstance.getExpRatio(), textinstance.getExp(), textinstance.getCredits(), textinstance.getComment(), textinstance.getWorkerUsername(), textinstance.getMissionInstanceState(), textinstance.getMissionId(), textinstance.getAcceptDate(), textinstance.getSubmitDate(), textinstance.isSubmitted(), completedCounts);
        return new TextInstanceDetailVo(textinstance.getMissionType(), instanceVo, textinstance.getTextResults());
    }

    private <T extends Instance> String getNextId(List<T> instances, MissionType missionType) {
        int result = 0;
        Optional<T> latestInstance = instances.stream().max((x1, x2) -> (MissionUtil.getId(x1.getMissionId()) - MissionUtil.getId(x2.getMissionId())));
        if (latestInstance.isPresent()) {
            result = MissionUtil.getId(latestInstance.get().getInstanceId()) + 1;
        }
        return MissionUtil.addTypeToId(result, missionType);
    }

    private TextInstance saveTextInstance(TextInstance textInstance) throws IOException {
        TextInstance result = textInstanceDao.save(textInstance);
        FileOutputStream fileOut = new FileOutputStream(PathUtil.getSerPath() + "text_instance" + "_" + textInstance.getInstanceId());
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(textInstance.getTextResults());
        out.close();
        fileOut.close();
        return result;
    }

    private ThreeDimensionInstance saveThreeDimensionInstance(ThreeDimensionInstance threeDimensionInstance) throws IOException {
        ThreeDimensionInstance result = threeDimensionInstanceDao.save(threeDimensionInstance);
        FileOutputStream fileOut = new FileOutputStream(PathUtil.getSerPath() + "threeDimension_instance" + "_" + threeDimensionInstance.getInstanceId());
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(threeDimensionInstance.getThreeDimensionResults());
        out.close();
        fileOut.close();
        return result;
    }

    private AudioInstance saveAudioInstance(AudioInstance audioInstance) throws IOException {
        AudioInstance result = audioInstanceDao.save(audioInstance);
        FileOutputStream fileOut = new FileOutputStream(PathUtil.getSerPath() + "audio_instance" + "_" + audioInstance.getInstanceId());
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(audioInstance.getAudioResults());
        out.close();
        fileOut.close();
        return result;
    }

    private VideoInstance saveVideoInstance(VideoInstance videoInstance) throws IOException {
        VideoInstance result = videoInstanceDao.save(videoInstance);
        FileOutputStream fileOut = new FileOutputStream(PathUtil.getSerPath() + "video_instance" + "_" + videoInstance.getInstanceId());
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(videoInstance.getVideoResults());
        out.close();
        fileOut.close();
        return result;
    }

    private ImageInstance saveImageInstance(ImageInstance imageInstance) throws IOException {
        ImageInstance result = imageInstanceDao.save(imageInstance);
        FileOutputStream fileOut = new FileOutputStream(PathUtil.getSerPath() + "image_instance" + "_" + imageInstance.getInstanceId());
        ObjectOutputStream out = new ObjectOutputStream(fileOut);
        out.writeObject(imageInstance.getImageResults());
        out.close();
        fileOut.close();
        return result;
    }

    private TextInstance getTextInstance(String instanceId) throws IOException, ClassNotFoundException {
        TextInstance textInstance = textInstanceDao.findTextInstanceByInstanceId(instanceId);
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "text_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<TextResult> textResults = (List<TextResult>) in.readObject();
        in.close();
        fileIn.close();
        textInstance.setTextResults(textResults);
        return textInstance;
    }

    private ImageInstance getImageInstance(String instanceId) throws IOException, ClassNotFoundException, SystemException {
        ImageInstance imageInstance = imageInstanceDao.findImageInstanceByInstanceId(instanceId);
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "image_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<ImageResult> imageResults = (List<ImageResult>) in.readObject();
        in.close();
        fileIn.close();
        imageInstance.setImageResults(imageResults);

        ImageMission imageMission = imageInstance.getImageMission();
        List<MissionAsset> missionAssets = new ArrayList(imageMission.getMissionAssets());
        List<RecommendTagItem> recommendTagItems = new ArrayList<>();
        for (int i = 0; i < missionAssets.size(); i++) {
            recommendTagItems.add(new RecommendTagItem(missionAssets.get(i).getTagConfTuple()));
        }
        RecommendTagsVo recommendTagsVo = pythonService.getRecommendTag(new RecommendTagsVo(recommendTagItems));
        List<RecommendTagItem> resultRecommendTagItemList = recommendTagsVo.getRecommendTagItemList();
        for (int i = 0; i < missionAssets.size(); i++) {
            MissionAsset missionAsset = missionAssets.get(i);
            missionAsset.setTagConfTuple(resultRecommendTagItemList.get(i).getTagConfTuples());
            missionAssets.set(i, missionAsset);
        }

        ImageMission returnImageMission = new ImageMission(imageMission.getMissionId(), imageMission.getTitle(), imageMission.getDescription(), imageMission.getTopics(), imageMission.getMissionState(), imageMission.getStart(), imageMission.getEnd(), imageMission.getCoverUrl(), imageMission.getRequesterUsername(), imageMission.getLevel(), imageMission.getCredits(), imageMission.getMinimalWorkerLevel(), imageMission.isAllowCustomTag(), imageMission.getAllowedTags(), imageMission.getMissionAssets(), imageMission.getImageMissionTypes(), imageMission.getImageInstances());
        returnImageMission.setMissionAssets(missionAssets);
        ImageInstance returnImageInstance = new ImageInstance(imageInstance.getInstanceId(), imageInstance.getWorkerUsername(), imageInstance.getMissionInstanceState(), MissionType.IMAGE, imageInstance.getAcceptDate(), imageInstance.getSubmitDate(), imageInstance.isSubmitted(), imageMission.getMissionId(), imageInstance.getExp(), imageInstance.getExpRatio(), imageInstance.getCredits(), imageInstance.getComment(), imageInstance.getImageResults(), imageInstance.getImageMission());
        returnImageInstance.setImageMission(returnImageMission);
        return returnImageInstance;
    }

    private VideoInstance getVideoInstance(String instanceId) throws IOException, ClassNotFoundException {
        VideoInstance videoInstance = videoInstanceDao.findVideoInstanceByInstanceId(instanceId);
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "video_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<VideoResult> videoResults = (List<VideoResult>) in.readObject();
        in.close();
        fileIn.close();
        videoInstance.setVideoResults(videoResults);
        return videoInstance;
    }

    private AudioInstance getAudioInstance(String instanceId) throws IOException, ClassNotFoundException {
        AudioInstance audioInstance = audioInstanceDao.findAudioInstanceByInstanceId(instanceId);
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "audio_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<AudioResult> audioResults = (List<AudioResult>) in.readObject();
        in.close();
        fileIn.close();
        audioInstance.setAudioResults(audioResults);
        return audioInstance;
    }

    private ThreeDimensionInstance getThreeDimensionInstance(String instanceId) throws IOException, ClassNotFoundException {
        ThreeDimensionInstance threeDimensionInstance = threeDimensionInstanceDao.findThreeDimensionInstanceByInstanceId(instanceId);
        FileInputStream fileIn = new FileInputStream(PathUtil.getSerPath() + "threeDimension_instance" + "_" + instanceId);
        ObjectInputStream in = new ObjectInputStream(fileIn);
        List<ThreeDimensionResult> threeDimensionResults = (List<ThreeDimensionResult>) in.readObject();
        in.close();
        fileIn.close();
        threeDimensionInstance.setThreeDimensionResults(threeDimensionResults);
        return threeDimensionInstance;
    }

}
