package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.exception.viewexception.NotMissionException;
import trapx00.tagx00.response.mission.MissionDetailResponse;
import trapx00.tagx00.response.mission.MissionPublicResponse;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.util.Arrays;

@Service
public class PublicMissionBlServiceImpl implements PublicMissionBlService {

    private final PublicMissionDataService publicMissionDataService;

    @Autowired
    public PublicMissionBlServiceImpl(PublicMissionDataService publicMissionDataService) {
        this.publicMissionDataService = publicMissionDataService;

    }

    @Override
    public MissionDetailResponse getOneMissionDetail(int missionId) throws NotMissionException {

        MissionDetailVo missionDetailVos = publicMissionDataService.getOneMissionDetail(missionId);
        if (missionDetailVos == null)
            throw new NotMissionException();
        return new MissionDetailResponse(missionDetailVos);
    }

    /**
     * get All missions
     *
     * @return the list of MissionPublicItemVo
     */
    @Override
    public MissionPublicResponse getMissions(PagingQueryVo pagingQueryVo)throws NotMissionException {

        MissionPublicItemVo[] missionPublicItemVos = publicMissionDataService.getMissions();
        if (missionPublicItemVos == null) {
            throw new NotMissionException();
        }

        return new MissionPublicResponse();
    }
}
