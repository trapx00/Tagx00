package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.TextNotExistException;
import trapx00.tagx00.exception.viewexception.ThreeDimensionNotExistException;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.util.ArrayList;

public interface PublicMissionBlService {
    /**
     * get  missions by pagingQueryVo
     *
     * @return the list of MissionPublicItemVo
     */
    MissionPublicResponse getMissions(PagingQueryVo pagingQueryVo, ArrayList<String> states, String searchTarget, String requesterUsername);

    /**
     * get one mission
     *
     * @param missionId
     * @return the list of MissionDetailVo
     */
    MissionDetailResponse getOneMissionDetail(String missionId) throws MissionIdDoesNotExistException, SystemException;


    /**
     * get text by text token
     *
     * @param token
     * @return
     */
    TextGetResponse getText(String token) throws TextNotExistException, SystemException;

    /**
     * get 3d model by tokens
     *
     * @param tokens
     * @return
     */
    ThreeModelGetResponse get3d(String tokens)throws ThreeDimensionNotExistException, SystemException;

    MissionStateResponse getNumOfMissionState(String missionId) throws SystemException,MissionIdDoesNotExistException;
}
