package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.exception.viewexception.NotMissionException;
import trapx00.tagx00.response.mission.MissionDetailResponse;
import trapx00.tagx00.response.mission.MissionPublicResponse;

public interface PublicMissionBlService {
    /**
     * get All missions
     *
     * @return the list of MissionPublicItemVo
     */
    MissionPublicResponse getAllMissions()throws NotMissionException;

    /**
     * get one mission
     *
     * @return the list of MissionDetailVo
     */
    MissionDetailResponse getOneMissionDetail(int missionId)throws NotMissionException;


}
