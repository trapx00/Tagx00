package trapx00.tagx00.bl.mission;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.exception.viewexception.*;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.ImageIdentificationResponse;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class WorkerMissionBlServiceImpl implements WorkerMissionBlService {
    private final WorkerMissionDataService workerMissionDataService;

    @Autowired
    public WorkerMissionBlServiceImpl(WorkerMissionDataService workerMissionDataService) {
        this.workerMissionDataService = workerMissionDataService;
    }

    /**
     * query to get all instances of workers
     *
     * @param workerUsername
     * @param pagingQueryVo
     * @return the list of MissionRequesterQueryItemVo
     */
    @Override
    public InstanceResponse queryOnesAllMissions(String workerUsername, PagingQueryVo pagingQueryVo) throws MissionDoesNotExistFromUsernameException {
        InstanceVo[] result = workerMissionDataService.getInstanceByWorkerUsername(workerUsername);
        if (result == null)
            throw new MissionDoesNotExistFromUsernameException();
        int startIndex = (pagingQueryVo.getPageNumber() - 1) * pagingQueryVo.getPageSize();
        int endIndex = startIndex + pagingQueryVo.getPageSize();

        ArrayList<InstanceVo> instanceVoArrayList = new ArrayList<>();
        if (result.length > startIndex) {
            if (result.length >= endIndex) {
                for (int i = startIndex; i < endIndex; i++) {
                    instanceVoArrayList.add(result[i]);
                }
            } else {
                for (int i = startIndex; i < result.length; i++) {
                    instanceVoArrayList.add(result[i]);
                }
            }
        }
        return new InstanceResponse(instanceVoArrayList);
    }

    /**
     * workers abort one mission
     *
     * @param missionId
     * @param workerUsername
     * @return whether the abortion is successful
     */
    @Override
    public SuccessResponse abort(String missionId, String workerUsername) {
        Instance instance = workerMissionDataService.getInstanceByUsernameAndMissionId(workerUsername, missionId, MissionUtil.getType(missionId));
        workerMissionDataService.abortInstance(instance.getInstanceId(), instance.getMissionType());
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
    public InstanceDetailResponse getInstanceInformation(String missionId, String workerUsername) throws InstanceNotExistException {
        InstanceDetailVo instanceDetailVo = workerMissionDataService.getInstanceDetailVoByUsernameAndMissionId(workerUsername, missionId, MissionUtil.getType(missionId));
        if (instanceDetailVo == null)
            throw new InstanceNotExistException();
        InstanceDetailResponse instanceDetailResponse = new InstanceDetailResponse(instanceDetailVo);
        return instanceDetailResponse;
    }


    /**
     * save the progress of the instance
     *
     * @param instanceVo
     * @return whether to save successful or not
     */
    @Override
    public SuccessResponse saveProgress(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException, UnmatchedUsernameAndMissionId {
        workerMissionDataService.updateInstanceDetailVo(instanceVo);
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
        if (workerMissionDataService.getInstanceDetailVoByUsernameAndMissionId(UserInfoUtil.getUsername(), instanceVo.getInstance().getMissionId(), instanceVo.getMissionType()) == null)
            workerMissionDataService.saveInstanceDetailVo(instanceVo);
        else {
            instanceVo.getInstance().setSubmitted(true);
            instanceVo.getInstance().setSubmitDate(new Date());
            instanceVo.getInstance().setMissionInstanceState(MissionInstanceState.SUBMITTED);
            workerMissionDataService.updateInstanceDetailVo(instanceVo);
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
            ImageIdentificationResponse imageIdentificationResponse = new ImageIdentificationResponse(resultMap);
            return imageIdentificationResponse;
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
    }
}
