package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.response.mission.MissionPublicResponse;

public interface PublicMissionBlService {
    /**
     * 获得本站所有现有有的任务信息
     *
     * @return the list of MissionPublicItemVo
     */
    MissionPublicResponse getAllMissions();


}
