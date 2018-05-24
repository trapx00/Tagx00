package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.response.mission.MissionDetailResponse;
import trapx00.tagx00.response.mission.MissionPublicResponse;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public interface PublicMissionBlService {
    /**
     * get  missions by pagingQueryVo
     *
     * @return the list of MissionPublicItemVo
     */
    MissionPublicResponse getMissions(PagingQueryVo pagingQueryVo, String searchTarget, String requesterUsername);

    /**
     * get one mission
     *
     * @param missionId
     * @return the list of MissionDetailVo
     */
    MissionDetailResponse getOneMissionDetail(String missionId) throws MissionIdDoesNotExistException;


}
