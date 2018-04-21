package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.exception.viewexception.*;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;

public interface WorkerMissionBlService {
    /**
     * query to get all instances of workers
     *
     * @param workerUsername
     * @return the list of MissionRequesterQueryItemVo
     */
    InstanceResponse queryOnesAllMissions(String workerUsername) throws MissionDoesNotExistFromUsernameException;

    /**
     * workers abort one mission
     *
     * @param missionId
     * @param workerUsername
     * @return whether the abortion is successful
     */
    SuccessResponse abort(String missionId, String workerUsername);

    /**
     * get the infomation of the instance of workers
     *
     * @param missionId
     * @param workerUsername
     * @return MissionQueryDetailResponse the detail of the mission
     */
    InstanceDetailResponse getInstanceInformation(String missionId, String workerUsername) throws InstanceNotExistException;

    /**
     * save the progress of the instance
     *
     * @param instanceVo
     * @return whether to save successful or not
     */
    SuccessResponse saveProgress(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException, UnmatchedUsernameAndMissionId;

    /**
     * save the progress of the instance and submit it
     *
     * @param instanceVo
     * @return whether to save and submit successful or not
     */
    SuccessResponse submit(InstanceDetailVo instanceVo) throws SystemException, MissionAlreadyAcceptedException;
}
