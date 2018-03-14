package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.response.SuccessResponse;
import trapx00.tagx00.response.mission.MissionQueryResponse;
import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

public interface WorkerMissionBlService {
    /**
     * 工人查询已接任务`
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    MissionQueryResponse queryOnesAllMissions(String username);

    /**
     * 工人放弃某一任务
     * @param missionId
     * @param username
     * @return whether the abortion is successful
     */
    SuccessResponse abort (int missionId,String username);

    /**
     * 工人工人获取自己领取任务的实例的信息
     * @param missionId
     * @param username
     * @return MissionInstanceDetailVo the detail of the mission
     */
    MissionInstanceDetailVo getInstanceInformation(int missionId,String username);

    /**
     * 工人保存当前任务的实例的进度或提交任务若返回为空就是获取新任务
     * @param username
     * @param missionId
     * @param mission
     */
    SuccessResponse saveProgress(String username,int missionId,MissionVo mission) ;
}
