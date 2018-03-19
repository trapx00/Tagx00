package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.exception.viewexception.InstanceNotExistException;
import trapx00.tagx00.exception.viewexception.MissionDoesNotExistFromUsernameException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.MissionQueryDetailResponse;
import trapx00.tagx00.response.mission.MissionQueryResponse;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

public interface WorkerMissionBlService {
    /**
     * query to get all instances of workers
     *
     * @param workerusername
     * @return the list of MissionRequesterQueryItemVo
     */
    MissionQueryResponse queryOnesAllMissions(String workerusername)throws MissionDoesNotExistFromUsernameException;

    /**
     * workers abort one mission
     *
     * @param missionId
     * @param workerusername
     * @return whether the abortion is successful
     */
    SuccessResponse abort(int missionId, String workerusername);

    /**
     * get the infomation of the instance of workers
     *
     * @param missionId
     * @param workerusername
     * @return MissionQueryDetailResponse the detail of the mission
     */
    MissionQueryDetailResponse getInstanceInformation(int missionId, String workerusername)throws InstanceNotExistException;

    /**
     * save the progress of the instance
     *
     * @param missionInstanceItemVo
     * @return whether to save successful or not
     */
    SuccessResponse saveProgress(MissionInstanceItemVo missionInstanceItemVo)throws SystemException;

    /**
     * save the progress of the instance and submit it
     *
     * @param missionInstanceItemVo
     * @return whether to save and submit successful or not
     */
    SuccessResponse submit(MissionInstanceItemVo missionInstanceItemVo)throws SystemException;
}
