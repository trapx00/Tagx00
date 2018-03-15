package trapx00.tagx00.data.mission;

import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

public class PublicMissionDataServiceImpl implements PublicMissionDataService {
    /**
     * get all missions
     * @return the list of missionPublicItemVo
     */
    @Override
    public MissionPublicItemVo[] getMissions() {
        return new MissionPublicItemVo[0];
    }
}
