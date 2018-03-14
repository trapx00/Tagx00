package trapx00.tagx00.blservice.mission;

import trapx00.tagx00.response.mission.MissionCreateResponse;
import trapx00.tagx00.response.mission.MissionInstancesQueryResponse;
import trapx00.tagx00.response.mission.MissionQueryDetailResponse;
import trapx00.tagx00.response.mission.MissionQueryResponse;
import trapx00.tagx00.vo.mission.requester.MissionCreateVo;

public interface RequestMissionBlService  {

    /**
     * 获得本站所有现有有的任务信息
     * @param mission
     * @return the combination of the id and token
     */
    MissionCreateResponse createMission(MissionCreateVo mission);\

    /**
     * 获得本发布者已发布的所有任务
     * @param username
     * @return the list of MissionRequesterQueryItemVo
     */
    MissionQueryResponse queryOnes(String username);

    /**
     * 获得任务详情
     * @param missionId
     * @return MissionRequesterQueryDetailVo
     */
    MissionQueryDetailResponse queryMissionDetail(int missionId);


    /**
     * 查询某一任务的实例
     * @param missionId
     * @return the list of MissionInstanceItemVo
     */
    MissionInstancesQueryResponse queryInstances(int missionId);


    queryInstance(int missionId);
}

