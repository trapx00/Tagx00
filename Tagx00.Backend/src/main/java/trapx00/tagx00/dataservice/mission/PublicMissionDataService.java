package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

public interface PublicMissionDataService {

    /**
     * get all missions
     * @return the list of missionPublicItemVo
     */
    MissionPublicItemVo[] getMissions();
}
