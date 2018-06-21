package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.*;
import trapx00.tagx00.data.dao.mission.instance.*;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.*;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.audio.AudioMissionDetailVo;
import trapx00.tagx00.vo.mission.audio.AudioMissionPublicItemVo;
import trapx00.tagx00.vo.mission.forpublic.MissionAssetVo;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionDetailVo;
import trapx00.tagx00.vo.mission.image.ImageMissionPublicItemVo;
import trapx00.tagx00.vo.mission.text.TextMissionDetailVo;
import trapx00.tagx00.vo.mission.text.TextMissionPublicItemVo;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionDetailVo;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionPublicItemVo;
import trapx00.tagx00.vo.mission.video.VideoMissionDetailVo;
import trapx00.tagx00.vo.mission.video.VideoMissionPublicItemVo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PublicMissionDataServiceImpl implements PublicMissionDataService {

    private final MissionDao missionDao;
    private final ImageMissionDao imageMissionDao;
    private final ImageInstanceDao imageInstanceDao;
    private final TextInstanceDao textInstanceDao;
    private final TextMissionDao textMissionDao;
    private final AudioMissionDao audioMissionDao;
    private final AudioInstanceDao audioInstanceDao;
    private final VideoMissionDao videoMissionDao;
    private final VideoInstanceDao videoInstanceDao;
    private final ThreeDimensionInstanceDao threeDimensionInstanceDao;
    private final ThreeDimensionMissionDao threeDimensionMissionDao;
    private final RequesterMissionDataService requesterMissionDataService;

    private final InstanceService instanceService;

    @Autowired
    public PublicMissionDataServiceImpl(MissionDao missionDao, ImageMissionDao imageMissionDao, ImageInstanceDao imageInstanceDao, TextMissionDao textMissionDao, TextInstanceDao textInstanceDao, RequesterMissionDataService requesterMissionDataService
        , AudioMissionDao audioMissionDao, AudioInstanceDao audioInstanceDao, VideoMissionDao videoMissionDao,
                                        VideoInstanceDao videoInstanceDao, ThreeDimensionInstanceDao threeDimensionInstanceDao,
                                        ThreeDimensionMissionDao threeDimensionMissionDao, InstanceService instanceService) {
        this.missionDao = missionDao;
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.textInstanceDao = textInstanceDao;
        this.textMissionDao = textMissionDao;
        this.requesterMissionDataService = requesterMissionDataService;
        this.audioInstanceDao = audioInstanceDao;
        this.audioMissionDao = audioMissionDao;
        this.videoInstanceDao = videoInstanceDao;
        this.videoMissionDao = videoMissionDao;
        this.threeDimensionInstanceDao = threeDimensionInstanceDao;
        this.threeDimensionMissionDao = threeDimensionMissionDao;
        this.instanceService = instanceService;
    }

    /**
     * get all missions
     *
     * @return the list of missionPublicItemVo
     */
    @Override
    public MissionPublicItemVo[] getMissions() {
        ArrayList<Mission> missionArrayList = new ArrayList<>();

        missionArrayList.addAll(imageMissionDao.findAll());
        missionArrayList.addAll(textMissionDao.findAll());
        missionArrayList.addAll(videoMissionDao.findAll());
        missionArrayList.addAll(audioMissionDao.findAll());
        missionArrayList.addAll(threeDimensionMissionDao.findAll());

        Mission[] missions = missionArrayList.toArray(new Mission[missionArrayList.size()]);
        MissionPublicItemVo[] result = new MissionPublicItemVo[missions.length];
        for (int i = 0; i < missions.length; i++) {
            switch (missions[i].getMissionType()) {
                case IMAGE:
                    result[i] = generateImageMissionPublicItemVo((ImageMission) missions[i]);
                    break;
                case TEXT:
                    result[i] = generateTextMissionPublicItemVo((TextMission) missions[i]);
                    break;
                case AUDIO:
                    result[i] = generateAudioMissionPublicItemVo((AudioMission) missions[i]);
                    break;
                case VIDEO:
                    result[i] = generateVideoMissionPublicItemVo((VideoMission) missions[i]);
                    break;
                case THREE_DIMENSION:
                    result[i] = generateThreeMissionPublicItemVo((ThreeDimensionMission) missions[i]);
                    break;
            }
        }
        return result;
    }

    /**
     * get all MissionsInfo
     *
     * @return Mission
     */
    @Override
    public Mission[] getAllMissions() {
        ArrayList<Mission> missionArrayList = new ArrayList<>();

        missionArrayList.addAll(imageMissionDao.findAll());
        missionArrayList.addAll(textMissionDao.findAll());
        missionArrayList.addAll(videoMissionDao.findAll());
        missionArrayList.addAll(audioMissionDao.findAll());
        missionArrayList.addAll(threeDimensionMissionDao.findAll());

        return missionArrayList.toArray(new Mission[missionArrayList.size()]);
    }


    /**
     * get the detail info of a mission
     *
     * @param missionId   the id of one mission
     * @param missionType
     * @returnxs
     */
    @Override
    public MissionDetailVo getOneMissionDetail(String missionId, MissionType missionType) throws MissionIdDoesNotExistException, IOException, ClassNotFoundException {
        MissionDetailVo missionDetailVo = null;
        switch (missionType) {
            case IMAGE:
                ImageMission imageMission = imageMissionDao.findImageMissionByMissionId(missionId);
                List<MissionAssetVo> missionAssetVos = new ArrayList<>();
                for (MissionAsset missionAsset : imageMission.getMissionAssets()) {
                    MissionAssetVo missionAssetVo = new MissionAssetVo(missionAsset.getUrl(), missionAsset.getTagConfTuple(), missionAsset.getBaiduTagConfTuple());
                    missionAssetVos.add(missionAssetVo);
                }
                if (imageMission == null)
                    throw new MissionIdDoesNotExistException();
                if (imageMission.getMissionType().equals(MissionType.IMAGE)) {
                    missionDetailVo = new ImageMissionDetailVo(new ImageMissionPublicItemVo(
                            missionId, imageMission.getTitle(), imageMission.getDescription(), imageMission.getTopics(), missionType,
                            imageMission.getStart(), imageMission.getEnd(), imageMission.getCoverUrl(),
                            imageMission.getLevel(), imageMission.getCredits(), imageMission.getMinimalWorkerLevel(),
                            imageMission.getMissionAssets().size() * imageMission.getImageMissionTypes().size(), imageMission.getRequesterUsername(),
                            imageMission.isAllowCustomTag(), imageMission.getImageMissionTypes()
                    )
                            , imageMission.getMissionState(), imageMission.getRequesterUsername(), missionAssetVos, imageMission.getAllowedTags());
                }
                break;
            case TEXT:
                TextMission textMission = (TextMission) requesterMissionDataService.getMissionByMissionId(missionId);
                if (textMission == null)
                    throw new MissionIdDoesNotExistException();
                if (textMission.getMissionType().equals(MissionType.TEXT)) {
                    List<String> textUrls = textMission.getTextTokens().stream().collect(ArrayList::new, (list, textToken) -> list.add(textToken.getToken()), ArrayList::addAll);
                    missionDetailVo = new TextMissionDetailVo(new TextMissionPublicItemVo(
                            missionId,
                            textMission.getTitle(),
                            textMission.getDescription(),
                            textMission.getTopics(), missionType,
                            textMission.getStart(), textMission.getEnd(),
                            textMission.getCoverUrl(), textMission.getLevel(), textMission.getCredits(),
                            textMission.getMinimalWorkerLevel(),
                            textMission.getTextTokens().size() * textMission.getTextMissionSettings().size(),
                            textMission.getRequesterUsername(),
                            textMission.getTextMissionSettings().stream().map(TextMissionSetting::getTextMissionType).collect(Collectors.toList())
//                        textMission.getTextMissionSettings().stream().collect(ArrayList::new, (list, textMissionSetting) -> list.add(textMissionSetting.getTextMissionType()), ArrayList::addAll)
                    ), textMission.getMissionState(),
                            textMission.getRequesterUsername(),
                            MissionType.TEXT,
                            textUrls,
                            new ArrayList<>(textMission.getTextMissionSettings()));
                }
                break;
            case THREE_DIMENSION:
                ThreeDimensionMission threeDimensionMission = threeDimensionMissionDao.findTHreeDimensionMissionByMissionId(missionId);
                if (threeDimensionMission == null)
                    throw new MissionIdDoesNotExistException();
                if (threeDimensionMission.getMissionType().equals(MissionType.THREE_DIMENSION)) {
                    missionDetailVo = new ThreeDimensionMissionDetailVo(new ThreeDimensionMissionPublicItemVo(
                            missionId, threeDimensionMission.getTitle(), threeDimensionMission.getDescription(), threeDimensionMission.getTopics(), missionType,
                            threeDimensionMission.getStart(), threeDimensionMission.getEnd(), threeDimensionMission.getCoverUrl(),
                            threeDimensionMission.getLevel(), threeDimensionMission.getCredits(), threeDimensionMission.getMinimalWorkerLevel(),
                            threeDimensionMission.getTokens().size(), threeDimensionMission.getRequesterUsername(),
                            threeDimensionMission.isAllowCustomTag(), threeDimensionMission.getAllowedTags()
                    ),
                            threeDimensionMission.getMissionState(), threeDimensionMission.getRequesterUsername(), MissionType.THREE_DIMENSION, threeDimensionMission.getTokens());
                }
                break;
            case VIDEO:
                VideoMission videoMission = videoMissionDao.findVideoMissionByMissionId(missionId);
                if (videoMission == null)
                    throw new MissionIdDoesNotExistException();
                if (videoMission.getMissionType().equals(MissionType.VIDEO)) {
                    missionDetailVo = new VideoMissionDetailVo(new VideoMissionPublicItemVo(
                            missionId, videoMission.getTitle(), videoMission.getDescription(), videoMission.getTopics(), missionType,
                            videoMission.getStart(), videoMission.getEnd(), videoMission.getCoverUrl(),
                            videoMission.getLevel(), videoMission.getCredits(), videoMission.getMinimalWorkerLevel(),
                            videoMission.getVideoUrls().size() * videoMission.getVideoMissionTypes().size(), videoMission.getRequesterUsername(),
                            videoMission.isAllowCustomTag(), videoMission.getAllowedTags()
                    ),
                            videoMission.getMissionState(), videoMission.getRequesterUsername(), MissionType.VIDEO, videoMission.getVideoUrls(), videoMission.getVideoMissionTypes());
                }
                break;
            case AUDIO:
                AudioMission audioMission = audioMissionDao.findAudioMissionByMissionId(missionId);
                if (audioMission == null)
                    throw new MissionIdDoesNotExistException();
                if (audioMission.getMissionType().equals(MissionType.AUDIO)) {
                    missionDetailVo = new AudioMissionDetailVo(new AudioMissionPublicItemVo(
                            missionId, audioMission.getTitle(), audioMission.getDescription(), audioMission.getTopics(), missionType,
                            audioMission.getStart(), audioMission.getEnd(), audioMission.getCoverUrl(),
                            audioMission.getLevel(), audioMission.getCredits(), audioMission.getMinimalWorkerLevel(),
                            audioMission.getAudioUrls().size() * audioMission.getAudioMissionTypes().size(), audioMission.getRequesterUsername(),
                            audioMission.isAllowCustomTag(), audioMission.getAllowedTags()
                    ),
                            audioMission.getMissionState(), audioMission.getRequesterUsername(), MissionType.AUDIO, audioMission.getAudioUrls(), audioMission.getAudioMissionTypes());
                }
                break;
        }
        return missionDetailVo;
    }

    /**
     * get all InstanceStateTypeDistribution
     *
     * @return Instance
     */
    @Override
    public Instance[] getInstances() {
        ArrayList<Instance> instanceArrayList = new ArrayList<>();

        instanceArrayList.addAll(imageInstanceDao.findAll());
        instanceArrayList.addAll(textInstanceDao.findAll());
        instanceArrayList.addAll(audioInstanceDao.findAll());
        instanceArrayList.addAll(videoInstanceDao.findAll());
        instanceArrayList.addAll(threeDimensionInstanceDao.findAll());


        return instanceArrayList.toArray(new Instance[instanceArrayList.size()]);
    }


    private ImageMissionPublicItemVo generateImageMissionPublicItemVo(ImageMission imageMission) {
        return new ImageMissionPublicItemVo(
                imageMission.getMissionId(), imageMission.getTitle(), imageMission.getDescription(), imageMission.getTopics(), imageMission.getMissionType(),
                imageMission.getStart(), imageMission.getEnd(), imageMission.getCoverUrl(),
                imageMission.getLevel(), imageMission.getCredits(), imageMission.getMinimalWorkerLevel(),
                imageMission.getMissionAssets().size() * imageMission.getImageMissionTypes().size(), imageMission.getRequesterUsername(),
                imageMission.isAllowCustomTag(), imageMission.getImageMissionTypes()
        );
    }

    private TextMissionPublicItemVo generateTextMissionPublicItemVo(TextMission textMission) {
        return new TextMissionPublicItemVo(
                textMission.getMissionId(), textMission.getTitle(),
                textMission.getDescription(), textMission.getTopics(), textMission.getMissionType(),
                textMission.getStart(), textMission.getEnd(), textMission.getCoverUrl(), textMission.getLevel(), textMission.getCredits(),
                textMission.getMinimalWorkerLevel(), textMission.getTextTokens().size() * textMission.getTextMissionSettings().size(),
                textMission.getRequesterUsername(), textMission.getTextMissionSettings().stream().collect(ArrayList::new, (list, textMissionSetting) -> list.add(textMissionSetting.getTextMissionType()), ArrayList::addAll)
        );
    }

    private VideoMissionPublicItemVo generateVideoMissionPublicItemVo(VideoMission videoMission) {
        return new VideoMissionPublicItemVo(
                videoMission.getMissionId(), videoMission.getTitle(), videoMission.getDescription(),
                videoMission.getTopics(), videoMission.getMissionType(),
                videoMission.getStart(), videoMission.getEnd(), videoMission.getCoverUrl(),
                videoMission.getLevel(), videoMission.getCredits(), videoMission.getMinimalWorkerLevel(),
                videoMission.getVideoUrls().size() * videoMission.getVideoMissionTypes().size(), videoMission.getRequesterUsername(),
                videoMission.isAllowCustomTag(), videoMission.getAllowedTags());
    }

    private ThreeDimensionMissionPublicItemVo generateThreeMissionPublicItemVo(ThreeDimensionMission videoMission) {
        return new ThreeDimensionMissionPublicItemVo(
                videoMission.getMissionId(), videoMission.getTitle(), videoMission.getDescription(),
                videoMission.getTopics(), videoMission.getMissionType(),
                videoMission.getStart(), videoMission.getEnd(), videoMission.getCoverUrl(),
                videoMission.getLevel(), videoMission.getCredits(), videoMission.getMinimalWorkerLevel(),
                videoMission.getTokens().size(), videoMission.getRequesterUsername(),
                videoMission.isAllowCustomTag(), videoMission.getAllowedTags());
    }

    private AudioMissionPublicItemVo generateAudioMissionPublicItemVo(AudioMission audioMission) {
        return new AudioMissionPublicItemVo(
                audioMission.getMissionId(), audioMission.getTitle(), audioMission.getDescription(),
                audioMission.getTopics(), audioMission.getMissionType(),
                audioMission.getStart(), audioMission.getEnd(), audioMission.getCoverUrl(),
                audioMission.getLevel(), audioMission.getCredits(), audioMission.getMinimalWorkerLevel(),
                audioMission.getAudioUrls().size() * audioMission.getAudioMissionTypes().size(), audioMission.getRequesterUsername(),
                audioMission.isAllowCustomTag(), audioMission.getAllowedTags());
    }
}
