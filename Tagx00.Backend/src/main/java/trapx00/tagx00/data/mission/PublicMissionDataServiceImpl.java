package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.data.dao.mission.TextMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.data.dao.mission.instance.TextInstanceDao;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.TextMission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionDetailVo;
import trapx00.tagx00.vo.mission.image.ImageMissionPublicItemVo;
import trapx00.tagx00.vo.mission.text.TextMissionDetailVo;
import trapx00.tagx00.vo.mission.text.TextMissionPublicItemVo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PublicMissionDataServiceImpl implements PublicMissionDataService {

    private final MissionDao missionDao;
    private final ImageMissionDao imageMissionDao;
    private final ImageInstanceDao imageInstanceDao;
    private final TextInstanceDao textInstanceDao;
    private final TextMissionDao textMissionDao;
    private final RequesterMissionDataService requesterMissionDataService;

    @Autowired
    public PublicMissionDataServiceImpl(MissionDao missionDao, ImageMissionDao imageMissionDao, ImageInstanceDao imageInstanceDao, TextMissionDao textMissionDao, TextInstanceDao textInstanceDao, RequesterMissionDataService requesterMissionDataService) {
        this.missionDao = missionDao;
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.textInstanceDao = textInstanceDao;
        this.textMissionDao = textMissionDao;
        this.requesterMissionDataService = requesterMissionDataService;
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
                if (imageMission == null)
                    return null;
                if (imageMission.getMissionType().equals(MissionType.IMAGE)) {
                    missionDetailVo = new ImageMissionDetailVo(new ImageMissionPublicItemVo(
                            missionId, imageMission.getTitle(), imageMission.getDescription(), imageMission.getTopics(), missionType,
                            imageMission.getStart(), imageMission.getEnd(), imageMission.getCoverUrl(),
                            imageMission.getLevel(), imageMission.getCredits(), imageMission.getMinimalWorkerLevel(),
                            imageMission.getMissionAssets().size() * imageMission.getImageMissionTypes().size(), imageMission.getRequesterUsername(),
                            imageMission.isAllowCustomTag(), imageMission.getImageMissionTypes()
                    ),
                            imageMission.getMissionState(), imageMission.getRequesterUsername(), MissionType.IMAGE, imageMission.getMissionAssets(), imageMission.getImageMissionTypes());
                }
                break;
            case TEXT:
                TextMission textMission = (TextMission) requesterMissionDataService.getMissionByMissionId(missionId);
                if (textMission == null)
                    return null;
                if (textMission.getMissionType().equals(MissionType.TEXT)) {
                    missionDetailVo = new TextMissionDetailVo(new TextMissionPublicItemVo(
                            missionId,
                            textMission.getTitle(),
                            textMission.getDescription(),
                            textMission.getTopics(), missionType,
                            textMission.getStart(), textMission.getEnd(),
                            textMission.getCoverUrl(), textMission.getLevel(), textMission.getCredits(),
                            textMission.getMinimalWorkerLevel(),
                            textMission.getTextUrls().size() * textMission.getTextMissionSettings().size(),
                            textMission.getRequesterUsername(),
                            textMission.getTextMissionSettings().stream().map(TextMissionSetting::getTextMissionType).collect(Collectors.toList())
//                        textMission.getTextMissionSettings().stream().collect(ArrayList::new, (list, textMissionSetting) -> list.add(textMissionSetting.getTextMissionType()), ArrayList::addAll)
                    ), textMission.getMissionState(),
                            textMission.getRequesterUsername(),
                            MissionType.TEXT,
                            textMission.getTextUrls(),
                            new ArrayList<>(textMission.getTextMissionSettings()));
                }
                break;
        }
        return missionDetailVo;
    }

    /**
     * get all InstanceInfo
     *
     * @return Instance
     */
    @Override
    public Instance[] getInstances() {
        ArrayList<Instance> instanceArrayList = new ArrayList<>();

        instanceArrayList.addAll(imageInstanceDao.findAll());
        instanceArrayList.addAll(textInstanceDao.findAll());

        return instanceArrayList.toArray(new Instance[instanceArrayList.size()]);
    }

    /**
     * add the browsing username to the mission
     *
     * @param missionId
     * @param username
     */
    @Override
    public void addBrowserUserToMission(String missionId, String username) throws MissionIdDoesNotExistException {
        Optional<Mission> optionalMission = missionDao.findById(missionId);
        if (optionalMission.isPresent()) {
            Mission mission = optionalMission.get();
            List<String> browserUserList = mission.getBrowserUsers();
            if (!browserUserList.contains(username)) {
                browserUserList.add(username);
            }
            mission.setBrowserUsers(browserUserList);
            missionDao.save(mission);
        } else {
            throw new MissionIdDoesNotExistException();
        }
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
                textMission.getMinimalWorkerLevel(), textMission.getTextUrls().size() * textMission.getTextMissionSettings().size(),
                textMission.getRequesterUsername(), textMission.getTextMissionSettings().stream().collect(ArrayList::new, (list, textMissionSetting) -> list.add(textMissionSetting.getTextMissionType()), ArrayList::addAll)
        );
    }
}
