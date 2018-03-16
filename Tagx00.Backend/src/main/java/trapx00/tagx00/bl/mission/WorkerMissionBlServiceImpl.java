package trapx00.tagx00.bl.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.WorkerMissionBlService;
import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.MissionQueryDetailResponse;
import trapx00.tagx00.response.mission.MissionQueryResponse;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

@Service
public class WorkerMissionBlServiceImpl implements WorkerMissionBlService {

    /**
     * query to get all missions of workers
     *
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    @Override
    public MissionQueryResponse queryOnesAllMissions(String username) {
        return null;
    }

    /**
     * workers abort one mission
     *
     * @param missionId
     * @param username
     * @return whether the abortion is successful
     */
    @Override
    public SuccessResponse abort(int missionId, String username) {
        return null;
    }

    /**
     * get the infomation of the instance of workers
     *
     * @param missionId
     * @param username
     * @return MissionQueryDetailResponse the detail of the mission
     */
    @Override
    public MissionQueryDetailResponse getInstanceInformation(int missionId, String username) {
        return null;
    }

    /**
     * save the progress of the instance
     *
     * @param username
     * @param missionId
     * @param mission   missionVo
     * @return whether to save successful or not
     */
    @Override
    public SuccessResponse saveProgress(String username, int missionId, MissionVo mission) {
        return null;
    }

    /**
     * save the progress of the instance and submit it
     *
     * @param username
     * @param missionId
     * @param mission
     * @return whether to save and submit successful or not
     */
    @Override
    public SuccessResponse submit(String username, int missionId, MissionVo mission) {
        return null;
    }
}
