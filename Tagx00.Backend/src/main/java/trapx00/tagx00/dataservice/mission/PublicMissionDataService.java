package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

public interface PublicMissionDataService {

    /**
     * get all missions
     * @return the list of missionPublicItemVo
     */
    MissionPublicItemVo[] getMissions();

    /**
     * get one mission detail
     * @param missionId the id of one mission
     * @return the missionDetailVo
     */
    MissionDetailVo getOneMissionDetail(int missionId);



}
