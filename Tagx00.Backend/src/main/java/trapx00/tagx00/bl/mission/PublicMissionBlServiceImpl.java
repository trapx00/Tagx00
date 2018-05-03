package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.exception.viewexception.NotMissionException;
import trapx00.tagx00.response.mission.MissionDetailResponse;
import trapx00.tagx00.response.mission.MissionPublicResponse;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.util.ArrayList;

@Service
public class PublicMissionBlServiceImpl implements PublicMissionBlService {

    private final PublicMissionDataService publicMissionDataService;

    @Autowired
    public PublicMissionBlServiceImpl(PublicMissionDataService publicMissionDataService) {
        this.publicMissionDataService = publicMissionDataService;

    }

    @Override
    public MissionDetailResponse getOneMissionDetail(String missionId) throws NotMissionException {

        MissionDetailVo missionDetailVos = publicMissionDataService.getOneMissionDetail(MissionUtil.getId(missionId), MissionUtil.getType(missionId));
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
    public MissionPublicResponse getMissions(PagingQueryVo pagingQueryVo, String searchTarget, String requesterUsername) {
        if (requesterUsername.length() != 0) {
            return justSearchByRequesterUsername(pagingQueryVo, requesterUsername);
        } else {
            return fuzzySearch(pagingQueryVo, searchTarget);
        }
    }

    private MissionPublicResponse justSearchByRequesterUsername(PagingQueryVo pagingQueryVo, String requesterUsername) {
        int startIndex = (pagingQueryVo.getPageNumber() - 1) * pagingQueryVo.getPageSize();
        int endIndex = startIndex + pagingQueryVo.getPageSize();
        MissionPublicItemVo[] missionPublicItemVos = publicMissionDataService.getMissions();
        ArrayList<MissionPublicItemVo> usernameResult = new ArrayList<>();
        for (MissionPublicItemVo missionPublicItemVo : missionPublicItemVos) {
            if (requesterUsername.length() == 0 || missionPublicItemVo.getRequesterUsername().equals(requesterUsername)) {
                usernameResult.add(missionPublicItemVo);
            }
        }

        ArrayList<MissionPublicItemVo> pArrayList = new ArrayList<>();
        if (usernameResult.size() >= endIndex) {
            for (int i = startIndex; i < endIndex; i++) {
                pArrayList.add(usernameResult.get(i));
            }
        } else {
            for (int i = startIndex; i < usernameResult.size(); i++) {
                pArrayList.add(usernameResult.get(i));
            }
        }
        int totalCount = usernameResult.size();
        int pageNum = (int) Math.ceil(totalCount * 1.0 / pagingQueryVo.getPageSize());
        return new MissionPublicResponse(new PagingInfoVo(totalCount, pagingQueryVo.getPageNumber(), pagingQueryVo.getPageSize(), pageNum), pArrayList);

    }

    private MissionPublicResponse fuzzySearch(PagingQueryVo pagingQueryVo, String searchTarget) {
        int startIndex = (pagingQueryVo.getPageNumber() - 1) * pagingQueryVo.getPageSize();
        int endIndex = startIndex + pagingQueryVo.getPageSize();
        MissionPublicItemVo[] missionPublicItemVos = publicMissionDataService.getMissions();
        ArrayList<MissionPublicItemVo> result = new ArrayList<>();
        for (MissionPublicItemVo missionPublicItemVo : missionPublicItemVos) {
            if (missionPublicItemVo.getTopics().contains(searchTarget)) {
                result.add(missionPublicItemVo);
            } else if (missionPublicItemVo.getTitle().contains(searchTarget)) {
                result.add(missionPublicItemVo);
            } else if (missionPublicItemVo.getDescription().contains(searchTarget)) {
                result.add(missionPublicItemVo);
            }
        }
        ArrayList<MissionPublicItemVo> pArrayList = new ArrayList<>();
        if (result.size() >= endIndex) {
            for (int i = startIndex; i < endIndex; i++) {
                pArrayList.add(missionPublicItemVos[i]);
            }
        } else {
            for (int i = startIndex; i < result.size(); i++) {
                pArrayList.add(missionPublicItemVos[i]);
            }
        }

        int totalCount = missionPublicItemVos.length;
        int pageNum = (int) Math.ceil(totalCount * 1.0 / pagingQueryVo.getPageSize());
        return new MissionPublicResponse(new PagingInfoVo(totalCount, pagingQueryVo.getPageNumber(), pagingQueryVo.getPageSize(), pageNum), pArrayList);
    }

}
