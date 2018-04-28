package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.dataservice.mission.WorkerMissionDataService;
import trapx00.tagx00.exception.viewexception.*;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.util.MissionUtil;
import trapx00.tagx00.util.UserInfoUtil;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.util.ArrayList;
import java.util.Date;

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
    public InstanceResponse queryOnesAllMissions(String workerUsername, PagingQueryVo pagingQueryVo) throws MissionDoesNotExistFromUsernameException, NoMoreInstanceException {
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
        workerMissionDataService.deleteInstanceByMissionIdAndUsername(MissionUtil.getId(missionId), workerUsername, MissionUtil.getType(missionId));
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
        InstanceDetailVo instanceDetailVo = workerMissionDataService.getInstanceByUsernameAndMissionId(workerUsername, MissionUtil.getId(missionId), MissionUtil.getType(missionId));
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
        workerMissionDataService.saveInstance(instanceVo);
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
        if (workerMissionDataService.getInstanceByUsernameAndMissionId(UserInfoUtil.getUsername(), MissionUtil.getId(instanceVo.getInstance().getMissionId()), instanceVo.getMissionType()) == null)
            workerMissionDataService.saveInstance(instanceVo);
        else {
            instanceVo.getInstance().setSubmitted(true);
            instanceVo.getInstance().setSubmitDate(new Date());
            instanceVo.getInstance().setMissionInstanceState(MissionInstanceState.SUBMITTED);
            workerMissionDataService.saveInstance(instanceVo);
        }
        return new SuccessResponse("Success Save");
    }
}
