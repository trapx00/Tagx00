package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionDetailVo;

import java.util.ArrayList;

@Service
public class PublicMissionDataServiceImpl implements PublicMissionDataService {

    private final ImageMissionDao imageMissionDao;

    @Autowired
    public PublicMissionDataServiceImpl(ImageMissionDao imageMissionDao) {
        this.imageMissionDao = imageMissionDao;
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
            result[i] = new MissionPublicItemVo(missions[i].getMissionId(), missions[i].getTitle(), missions[i].getDescription(),
                    missions[i].getTopics(), missions[i].isAllowCustomTag(), missions[i].getAllowedTags(),
                    missions[i].getMissionType(),
                    missions[i].getStart(), missions[i].getEnd(), missions[i].getCoverUrl(), missions[i].getRequesterUsername());
        }
        return result;
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
                            missionId, mission.getTitle(), mission.getDescription(), mission.getTopics(),
                            mission.isAllowCustomTag(), mission.getAllowedTags(), mission.getMissionType(),
                            mission.getStart(), mission.getEnd(), mission.getCoverUrl(), mission.getRequesterUsername()
                    ), mission.getMissionState(), mission.getImageUrls(), mission.getImageMissionTypes());
                }
                break;
        }
        return missionDetailVo;
    }
}
