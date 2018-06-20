package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.dataservice.upload.TextDataService;
import trapx00.tagx00.dataservice.upload.ThreeDimensionDataService;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.TextNotExistException;
import trapx00.tagx00.exception.viewexception.ThreeDimensionNotExistException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.vo.mission.forpublic.MissionAssetVo;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionDetailVo;
import trapx00.tagx00.vo.ml.RecommendTagItem;
import trapx00.tagx00.vo.ml.RecommendTagsVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PublicMissionBlServiceImpl implements PublicMissionBlService {

    private final PublicMissionDataService publicMissionDataService;
    private final TextDataService textDataService;
    private final ThreeDimensionDataService threeDimensionDataService;
    private final PythonService pythonService;

    @Autowired
    public PublicMissionBlServiceImpl(PublicMissionDataService publicMissionDataService, TextDataService textDataService,
                                      ThreeDimensionDataService threeDimensionDataService, PythonService pythonService) {
        this.publicMissionDataService = publicMissionDataService;
        this.textDataService = textDataService;
        this.threeDimensionDataService = threeDimensionDataService;
        this.pythonService = pythonService;
    }

    @Override
    public MissionDetailResponse getOneMissionDetail(String missionId) throws MissionIdDoesNotExistException, SystemException {
        MissionDetailVo missionDetailVo;
        try {
            missionDetailVo = publicMissionDataService.getOneMissionDetail(missionId, MissionUtil.getType(missionId));
            if (missionDetailVo.getMissionType() == MissionType.IMAGE) {
                ImageMissionDetailVo imageMissionPublicItemVo = (ImageMissionDetailVo) missionDetailVo;
                List<MissionAssetVo> originMissionAssets = imageMissionPublicItemVo.getMissionAssetVos();
                List<RecommendTagItem> recommendTagItems = new ArrayList<>();
                for (int i = 0; i < originMissionAssets.size(); i++) {
                    recommendTagItems.add(new RecommendTagItem(originMissionAssets.get(i).getTagConfTuple()));
                }
                RecommendTagsVo recommendTagsVo = pythonService.getRecommendTag(new RecommendTagsVo(recommendTagItems));
                List<RecommendTagItem> resultRecommendTagItemList = recommendTagsVo.getRecommendTagItemList();
                for (int i = 0; i < originMissionAssets.size(); i++) {
                    MissionAssetVo missionAsset = originMissionAssets.get(i);
                    missionAsset.setTagConfTuple(resultRecommendTagItemList.get(i).getTagConfTuples());
                    originMissionAssets.set(i, missionAsset);
                }
                imageMissionPublicItemVo.setMissionAssetVos(originMissionAssets);
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        return new MissionDetailResponse(missionDetailVo);
    }

    @Override
    public MissionStateResponse getNumOfMissionState(String missionId) {
        Instance[] instances = publicMissionDataService.getInstances();
        int in_progress = 0;
        int submitted = 0;
        int finalized = 0;
        int abandoned = 0;
        for (Instance instance : instances) {
            if (instance.getMissionId().equals(missionId)) {
                switch (instance.getMissionInstanceState()) {
                    case IN_PROGRESS:
                        in_progress++;
                        break;
                    case FINALIZED:
                        finalized++;
                        break;
                    case SUBMITTED:
                        finalized++;
                        break;
                    case ABANDONED:
                        abandoned++;
                        break;

                }
            }
        }
        return new MissionStateResponse(in_progress, submitted, finalized, abandoned);


    }

    /**
     * w
     * get text by text token
     *
     * @param token
     * @return
     */
    @Override
    public TextGetResponse getText(String token) throws TextNotExistException, SystemException {
        return new TextGetResponse(textDataService.getText(token));
    }

    /**
     * get 3d model by tokens
     *
     * @param tokens
     * @return
     */
    @Override
    public ThreeModelGetResponse get3d(String tokens) throws ThreeDimensionNotExistException, SystemException {
        return new ThreeModelGetResponse(threeDimensionDataService.get3d(tokens));
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
            search(searchTarget, result, missionPublicItemVo);

        }
        ArrayList<MissionPublicItemVo> pArrayList = new ArrayList<>();
        int end = Math.min(result.size(), endIndex);
        for (int i = startIndex; i < end; i++) {
            pArrayList.add(result.get(i));
        }

        int totalCount = result.size();
        int pageNum = (int) Math.ceil(totalCount * 1.0 / pagingQueryVo.getPageSize());
        return new MissionPublicResponse(new PagingInfoVo(totalCount, pagingQueryVo.getPageNumber(), pagingQueryVo.getPageSize(), pageNum), pArrayList);
    }

    private void search(String searchTarget, ArrayList<MissionPublicItemVo> result, MissionPublicItemVo missionPublicItemVo) {
        if (missionPublicItemVo.getTopics().contains(searchTarget)) {
            result.add(missionPublicItemVo);
        } else if (missionPublicItemVo.getTitle().contains(searchTarget)) {
            result.add(missionPublicItemVo);
        } else if (missionPublicItemVo.getDescription().contains(searchTarget)) {
            result.add(missionPublicItemVo);
        }
    }

}
