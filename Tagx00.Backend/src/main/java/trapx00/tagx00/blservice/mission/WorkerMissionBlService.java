package trapx00.tagx00.blservice.mission;

import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.exception.viewexception.*;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.ImageIdentificationResponse;
import trapx00.tagx00.response.mission.InstanceDetailResponse;
import trapx00.tagx00.response.mission.InstanceResponse;
import trapx00.tagx00.response.mission.WordSegmentationResponse;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.io.IOException;

public interface WorkerMissionBlService {
    /**
     * query to get all instances of workers
     *
     * @param workerUsername
     * @param pagingQueryVo
     * @return the list of MissionRequesterQueryItemVo
     */
    InstanceResponse queryOnesAllMissions(String workerUsername, PagingQueryVo pagingQueryVo) throws MissionDoesNotExistFromUsernameException;

    /**
     * workers abort one mission
     *
     * @param missionId
     * @param workerUsername
     * @return whether the abortion is successful
     */
    SuccessResponse abort(String missionId, String workerUsername) throws SystemException;

    /**
     * get the infomation of the instance of workers
     *
     * @param missionId
     * @param workerUsername
     * @return MissionQueryDetailResponse the detail of the mission
     */
    InstanceDetailResponse getInstanceInformation(String missionId, String workerUsername) throws InstanceNotExistException, SystemException;

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

    /**
     * identify the image's type
     *
     * @param multipartFile
     * @return
     */
    ImageIdentificationResponse identifyImage(MultipartFile multipartFile) throws SystemException;

    /**
     * segment word
     *
     * @param missionId
     * @param token
     * @return
     */
    WordSegmentationResponse segmentWords(String missionId, String token) throws MissionIdDoesNotExistException, IOException, ClassNotFoundException;
}
