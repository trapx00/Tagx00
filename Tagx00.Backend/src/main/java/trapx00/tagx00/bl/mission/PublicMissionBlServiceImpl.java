package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.dataservice.upload.TextDataService;
import trapx00.tagx00.dataservice.upload.ThreeDimensionDataService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.MissionAsset;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.TextNotExistException;
import trapx00.tagx00.exception.viewexception.ThreeDimensionNotExistException;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.response.mission.*;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.vo.mission.forpublic.MissionAssetVo;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionDetailVo;
import trapx00.tagx00.vo.ml.RecommendRequestVo;
import trapx00.tagx00.vo.ml.RecommendTagItem;
import trapx00.tagx00.vo.ml.RecommendTagsVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.io.IOException;
import java.io.StreamCorruptedException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

                ImageMissionDetailVo imageMissionDetailVo = (ImageMissionDetailVo) missionDetailVo;

                List<MissionAssetVo> originMissionAssets = imageMissionDetailVo.getMissionAssetVos();

                List<RecommendTagItem> recommendTagItems = new ArrayList<>();
                List<RecommendTagItem> baiduItems = new ArrayList<>();

                for (MissionAssetVo asset : originMissionAssets) {
                    recommendTagItems.add(new RecommendTagItem(asset.getUrl(), asset.getTagConfTuple()));
                    baiduItems.add(new RecommendTagItem(asset.getUrl(), asset.getBaiduTagConfTuple()));
                }

                RecommendTagsVo recommendTagsVo = pythonService.getRecommendTag(
                    new RecommendRequestVo(
                        recommendTagItems,
                        baiduItems
                    ));

                List<RecommendTagItem> resultRecommendTagItemList = recommendTagsVo.getRecommendTagItemList();
                for (int i = 0; i < originMissionAssets.size(); i++) {
                    MissionAssetVo missionAsset = originMissionAssets.get(i);
                    missionAsset.setTagConfTuple(resultRecommendTagItemList.get(i).getTagConfTuples());
                }
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
    public MissionPublicResponse getMissions(PagingQueryVo pagingQueryVo, ArrayList<String> states, String searchTarget, String requesterUsername) {
        if (requesterUsername.length() != 0) {
            return justSearchByRequesterUsername(pagingQueryVo, requesterUsername, states);
        } else {
            return fuzzySearch(pagingQueryVo, searchTarget, states);
        }
    }

    private MissionPublicResponse justSearchByRequesterUsername(PagingQueryVo pagingQueryVo, String requesterUsername, ArrayList<String> states) {
        Stream<Mission> missions = Arrays.stream(publicMissionDataService.getAllMissions());
        ArrayList<MissionPublicItemVo> publicItems = new ArrayList<>(Arrays.asList(publicMissionDataService.getMissions()));

        int startIndex = (pagingQueryVo.getPageNumber() - 1) * pagingQueryVo.getPageSize();

        // filter with states


        List<Mission> results = missions
            .filter(x -> x.getRequesterUsername().equals(requesterUsername))
            .filter(x -> states == null || states.contains(x.getMissionState().name()))
            .collect(Collectors.toList());

        List<MissionPublicItemVo> paged = results.stream()
            .skip(startIndex)
            .limit(pagingQueryVo.getPageSize())
            .map(x -> publicItems.stream().filter(y -> y.getMissionId().equals(x.getMissionId())).findFirst().get())
            .collect(Collectors.toList());


        return new MissionPublicResponse(
            new PagingInfoVo(results.size(), pagingQueryVo.getPageNumber(), pagingQueryVo.getPageSize()),
            paged
        );

    }

    private MissionPublicResponse fuzzySearch(PagingQueryVo pagingQueryVo, String searchTarget, ArrayList<String> states) {
        int startIndex = (pagingQueryVo.getPageNumber() - 1) * pagingQueryVo.getPageSize();
        Stream<MissionPublicItemVo> missions = Arrays.stream(publicMissionDataService.getMissions());


        List<MissionPublicItemVo> results = missions
            .filter(x -> states == null || states.contains(x.getMissionType().name()))
            .filter(x -> search(searchTarget, x))
            .collect(Collectors.toList());

        List<MissionPublicItemVo> paged = results
            .stream()
            .skip(startIndex)
            .limit(pagingQueryVo.getPageSize())
            .collect(Collectors.toList());

        return new MissionPublicResponse(
            new PagingInfoVo(results.size(), pagingQueryVo.getPageNumber(), pagingQueryVo.getPageSize()),
            paged
        );
    }

    private boolean search(String searchTarget, MissionPublicItemVo missionPublicItemVo) {
        if (missionPublicItemVo.getTopics().contains(searchTarget)) {
            return true;
        } else if (missionPublicItemVo.getTitle().contains(searchTarget)) {
            return true;
        } else if (missionPublicItemVo.getDescription().contains(searchTarget)) {
            return true;
        }
        return false;
    }

}
