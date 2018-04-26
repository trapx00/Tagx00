package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionDetailVo;
import trapx00.tagx00.vo.mission.image.ImageMissionPublicItemVo;

import java.util.ArrayList;

@Service
public class PublicMissionDataServiceImpl implements PublicMissionDataService {

    private final ImageMissionDao imageMissionDao;
    private final ImageInstanceDao imageInstanceDao;

    @Autowired
    public PublicMissionDataServiceImpl(ImageMissionDao imageMissionDao, ImageInstanceDao imageInstanceDao) {
        this.imageMissionDao = imageMissionDao;
        this.imageInstanceDao = imageInstanceDao;
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
    public MissionDetailVo getOneMissionDetail(int missionId, MissionType missionType) {
        MissionDetailVo missionDetailVo = null;
        switch (missionType) {
            case IMAGE:
                ImageMission mission = imageMissionDao.findMissionByMissionId(missionId);
                if (mission == null)
                    return null;
                if (mission.getMissionType().equals(MissionType.IMAGE)) {
                    missionDetailVo = new ImageMissionDetailVo(new MissionPublicItemVo(
                            MissionUtil.addTypeToId(missionId, missionType), mission.getTitle(), mission.getDescription(), mission.getTopics(),
                            mission.isAllowCustomTag(), mission.getAllowedTags(), mission.getMissionType(),
                            mission.getStart(), mission.getEnd(), mission.getCoverUrl(), mission.getLevel(), mission.getCredits(), mission.getMinimalWorkerLevel(), mission.getImageUrls().size() * mission.getImageMissionTypes().size(), mission.getRequesterUsername()
                    ), mission.getMissionState(), mission.getRequesterUsername(), mission.getImageUrls(), mission.getImageMissionTypes());
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

        return instanceArrayList.toArray(new Instance[instanceArrayList.size()]);
    }

    public ImageMissionPublicItemVo generateImageMissionPublicItemVo(ImageMission imageMission) {
        return new ImageMissionPublicItemVo(MissionUtil.addTypeToId(imageMission.getMissionId(), imageMission.getMissionType()), imageMission.getTitle(), imageMission.getDescription(), imageMission.getTopics(),
                imageMission.isAllowCustomTag(), imageMission.getAllowedTags(), imageMission.getMissionType(),
                imageMission.getStart(), imageMission.getEnd(), imageMission.getCoverUrl(), imageMission.getLevel(), imageMission.getCredits(), imageMission.getMinimalWorkerLevel(), imageMission.getImageUrls().size() * imageMission.getImageMissionTypes().size(), imageMission.getRequesterUsername(), imageMission.getImageMissionTypes());
    }
}
