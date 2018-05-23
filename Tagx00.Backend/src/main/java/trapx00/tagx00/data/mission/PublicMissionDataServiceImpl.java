package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.TextMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.data.dao.mission.instance.TextInstanceDao;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.TextMission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionDetailVo;
import trapx00.tagx00.vo.mission.image.ImageMissionPublicItemVo;
import trapx00.tagx00.vo.mission.text.TextMissionDetailVo;
import trapx00.tagx00.vo.mission.text.TextMissionPublicItemVo;
import trapx00.tagx00.vo.mission.text.TextMissionSetting;
import trapx00.tagx00.vo.mission.text.TextMissionType;

import java.util.ArrayList;
import java.util.List;

@Service
public class PublicMissionDataServiceImpl implements PublicMissionDataService {

    private final ImageMissionDao imageMissionDao;
    private final ImageInstanceDao imageInstanceDao;
    private final TextInstanceDao textInstanceDao;
    private final TextMissionDao textMissionDao;

    @Autowired
    public PublicMissionDataServiceImpl(ImageMissionDao imageMissionDao, ImageInstanceDao imageInstanceDao, TextMissionDao textMissionDao,TextInstanceDao textInstanceDao) {
        this.imageInstanceDao = imageInstanceDao;
        this.imageMissionDao = imageMissionDao;
        this.textInstanceDao=textInstanceDao;
        this.textMissionDao=textMissionDao;
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

        Mission[] missions = missionArrayList.toArray(new Mission[missionArrayList.size()]);
        if (missions == null)
            return null;
        MissionPublicItemVo[] result = new MissionPublicItemVo[missions.length];
        for (int i = 0; i < missions.length; i++) {
            switch (missions[i].getMissionType()) {
                case IMAGE:
                    result[i] = generateImageMissionPublicItemVo((ImageMission) missions[i]);
                    break;
                case TEXT:
                    result[i]=generateTextMissionPublicItemVo((TextMission)missions[i]);
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
    public MissionDetailVo getOneMissionDetail(String missionId, MissionType missionType) {
        MissionDetailVo missionDetailVo = null;
        switch (missionType) {
            case IMAGE:
                ImageMission mission = imageMissionDao.findImageMissionByMissionId(missionId);
                if (mission == null)
                    return null;
                if (mission.getMissionType().equals(MissionType.IMAGE)) {
                    missionDetailVo = new ImageMissionDetailVo(new ImageMissionPublicItemVo(
                            missionId, mission.getTitle(), mission.getDescription(),mission.getTopics(), missionType,
                            mission.getStart(), mission.getEnd(), mission.getCoverUrl(),
                            mission.getLevel(), mission.getCredits(), mission.getMinimalWorkerLevel(),
                            mission.getImageUrls().size() * mission.getImageMissionTypes().size(), mission.getRequesterUsername(),
                            mission.isAllowCustomTag(), mission.getAllowedTags(), mission.getImageMissionTypes()
                    ),
                            mission.getMissionState(), mission.getRequesterUsername(), mission.getImageUrls(), mission.getImageMissionTypes());
                }
                break;
            case TEXT:
                TextMission mission1 = textMissionDao.findTextMissionByMissionId(missionId);
                if (mission1 == null)
                    return null;
                if (mission1.getMissionType().equals(MissionType.IMAGE)) {
                    missionDetailVo = new TextMissionDetailVo(new TextMissionPublicItemVo(
                            missionId, mission1.getTitle(),
                            mission1.getDescription(),mission1.getTopics(), missionType,
                            mission1.getStart(), mission1.getEnd(), mission1.getCoverUrl(), mission1.getLevel(), mission1.getCredits(),
                            mission1.getMinimalWorkerLevel(), mission1.getTextUrls().size() * mission1.getTextMissionTypes().size(),
                            mission1.getRequesterUsername(),mission1.getTextMissionTypes()
                    ), mission1.getMissionState(), mission1.getRequesterUsername(), mission1.getTextUrls(), generateTextMissionSettings(mission1.getTextMissionTypes()));
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

    public ImageMissionPublicItemVo generateImageMissionPublicItemVo(ImageMission mission) {
        return new ImageMissionPublicItemVo(
                mission.getMissionId(), mission.getTitle(), mission.getDescription(), mission.getTopics(),mission.getMissionType(),
                mission.getStart(), mission.getEnd(), mission.getCoverUrl(),
                mission.getLevel(), mission.getCredits(), mission.getMinimalWorkerLevel(),
                mission.getImageUrls().size() * mission.getImageMissionTypes().size(), mission.getRequesterUsername(),
                mission.isAllowCustomTag(), mission.getAllowedTags(), mission.getImageMissionTypes()
        );
    }

    public TextMissionPublicItemVo generateTextMissionPublicItemVo(TextMission mission1) {
        return new TextMissionPublicItemVo(
                mission1.getMissionId(), mission1.getTitle(),
                mission1.getDescription(), mission1.getTopics(),mission1.getMissionType(),
                mission1.getStart(), mission1.getEnd(), mission1.getCoverUrl(), mission1.getLevel(), mission1.getCredits(),
                mission1.getMinimalWorkerLevel(), mission1.getTextUrls().size() * mission1.getTextMissionTypes().size(),
                mission1.getRequesterUsername(),mission1.getTextMissionTypes()
        );
    }
    public List<TextMissionSetting> generateTextMissionSettings(List<TextMissionType> missionTypes){
        List<TextMissionSetting> textMissionSettings=new ArrayList<>();
        for(TextMissionType textMissionType:missionTypes)
            textMissionSettings.add(new TextMissionSetting(textMissionType));
        return textMissionSettings;
    }
}
