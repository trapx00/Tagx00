package trapx00.tagx00.bl.mission;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.TextMission;
import trapx00.tagx00.entity.mission.TextToken;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.exception.viewexception.*;
import trapx00.tagx00.mlservice.PythonService;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.ImageIdentificationResponse;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.response.mission.WordSegmentationResponse;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.image.ImageInstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class WorkerMissionBlServiceImpl implements WorkerMissionBlService {
    private final WorkerMissionDataService workerMissionDataService;
    private final RequesterMissionDataService requesterMissionDataService;
    private final PythonService pythonService;

    @Autowired
    public WorkerMissionBlServiceImpl(WorkerMissionDataService workerMissionDataService, RequesterMissionDataService requesterMissionDataService, PythonService pythonService) {
        this.workerMissionDataService = workerMissionDataService;
        this.requesterMissionDataService = requesterMissionDataService;
        this.pythonService = pythonService;
    }

    /**
     * query to get all instances of workers
     *
     * @param workerUsername
     * @param pagingQueryVo
     * @return the list of MissionRequesterQueryItemVo
     */
    @Override
    public InstanceResponse queryOnesAllMissions(String workerUsername, PagingQueryVo pagingQueryVo, ArrayList<String> states) throws MissionDoesNotExistFromUsernameException {
        Stream<InstanceVo> result = Arrays.stream(workerMissionDataService.getInstanceByWorkerUsername(workerUsername));
        if (result == null)
            throw new MissionDoesNotExistFromUsernameException();
        int startIndex = (pagingQueryVo.getPageNumber() - 1) * pagingQueryVo.getPageSize();

        List<InstanceVo> filteredResults = result
            .filter(x -> states == null || states.contains(x.getMissionInstanceState().name()))
            .collect(Collectors.toList());

        List<InstanceVo> results = filteredResults.stream()
            .skip(startIndex)
            .limit(pagingQueryVo.getPageSize())
            .collect(Collectors.toList());


        InstanceResponse instanceResponse = new InstanceResponse(results,
            new PagingInfoVo(filteredResults.size(),
                pagingQueryVo.getPageNumber(),
                pagingQueryVo.getPageSize()
            )
        );
        return instanceResponse;
    }

    /**
     * workers abort one mission
     *
     * @param missionId
     * @param workerUsername
     * @return whether the abortion is successful
     */
    @Override
    public SuccessResponse abort(String missionId, String workerUsername) throws SystemException {
        Instance instance = workerMissionDataService.getInstanceByUsernameAndMissionId(workerUsername, missionId, MissionUtil.getType(missionId));
        try {
            workerMissionDataService.abortInstance(instance.getInstanceId(), instance.getMissionType());
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        return new SuccessResponse("Success Delete");
    }

    /**
     * get the infomation of the instance of workers
     *
     * @param missionId
     * @param workerUsername
     * @return MissionQueryDetailResponse the detail of the mission
     */
    @Override
    public InstanceDetailResponse getInstanceInformation(String missionId, String workerUsername) throws InstanceNotExistException, SystemException {
        InstanceDetailVo instanceDetailVo;
        try {
            instanceDetailVo = workerMissionDataService.getInstanceDetailVoByUsernameAndMissionId(workerUsername, missionId, MissionUtil.getType(missionId));
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        if (instanceDetailVo == null)
            throw new InstanceNotExistException();
        return new InstanceDetailResponse(instanceDetailVo);
    }


    /**
     * save the progress of the instance
     *
     * @param instanceVo
     * @return whether to save successful or not
     */
    @Override
    public SuccessResponse saveProgress(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException, UnmatchedUsernameAndMissionId {
        try {
            workerMissionDataService.updateInstanceDetailVo(instanceVo);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        return new SuccessResponse("Success Save");
    }

    /**
     * save the progress of the instance and submit it
     *
     * @param instanceVo
     * @return whether to save and submit successful or not
     */
    @Override
    public SuccessResponse submit(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException {
        try {
            if (workerMissionDataService.getInstanceDetailVoByUsernameAndMissionId(UserInfoUtil.getUsername(), instanceVo.getInstance().getMissionId(), instanceVo.getMissionType()) == null) {
                try {
                    workerMissionDataService.saveInstanceDetailVo(instanceVo);
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new SystemException();
                }
            } else {
                instanceVo.getInstance().setSubmitted(true);
                instanceVo.getInstance().setSubmitDate(new Date());
                instanceVo.getInstance().setMissionInstanceState(MissionInstanceState.SUBMITTED);
                try {
                    workerMissionDataService.updateInstanceDetailVo(instanceVo);
                    if (instanceVo.getMissionType() == MissionType.IMAGE) {
                        pythonService.trainRecommend((ImageInstanceDetailVo) instanceVo);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new SystemException();
                }
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        return new SuccessResponse("Success Save");
    }

    /**
     * identify the image's type
     *
     * @param multipartFile
     * @return
     */
    @Override
    public ImageIdentificationResponse identifyImage(MultipartFile multipartFile) throws SystemException {
        try {
            JSONArray imageInfo = workerMissionDataService.identifyImage(multipartFile.getBytes());
            Map<String, Double> resultMap = new HashMap<>();
            for (int i = 0; i < imageInfo.size(); i++) {
                JSONObject jsonObject = (JSONObject) imageInfo.get(i);
                resultMap.put((String) jsonObject.get("value"), (Double) jsonObject.get("confidence"));
            }
            return new ImageIdentificationResponse(resultMap);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }

    /**
     * segment word
     *
     * @param token
     * @param missionId
     * @return
     */
    @Override
    public WordSegmentationResponse segmentWords(String missionId, String token) throws MissionIdDoesNotExistException, IOException, ClassNotFoundException {
        Mission mission = requesterMissionDataService.getMissionByMissionId(missionId);
        List<String> words = new ArrayList<>();
        for (TextToken textToken : ((TextMission) mission).getTextTokens()) {
            if (textToken.getToken().equals(token)) {
                words = textToken.getSegmentedSentence().stream().collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
            }
        }
        return new WordSegmentationResponse(words);
    }
}
