package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.MissionQueryDetailResponse;
import trapx00.tagx00.response.mission.MissionQueryResponse;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

public interface WorkerMissionBlService {
    /**
     * query to get all missions of workers
     *
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    MissionQueryResponse queryOnesAllMissions(String username);

    /**
     * workers abort one mission
     *
     * @param missionId
     * @param username
     * @return whether the abortion is successful
     */
    SuccessResponse abort(int missionId, String username);

    /**
     * get the infomation of the instance of workers
     *
     * @param missionId
     * @param username
     * @return MissionQueryDetailResponse the detail of the mission
     */
    MissionQueryDetailResponse getInstanceInformation(int missionId, String username);

    /**
     * save the progress of the instance
     *
     * @param username
     * @param missionId
     * @param mission
     * @return whether to save successful or not
     */
    SuccessResponse saveProgress(String username, int missionId, MissionVo mission);

    /**
     * save the progress of the instance and submit it
     *
     * @param username
     * @param missionId
     * @param mission
     * @return whether to save and submit successful or not
     */
    SuccessResponse submit(String username, int missionId, MissionVo mission);
}
