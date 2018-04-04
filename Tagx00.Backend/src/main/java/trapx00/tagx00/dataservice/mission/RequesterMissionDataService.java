package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;

public interface RequesterMissionDataService {

    /**
     * save mission
     *
     * @param mission
     */
    int saveMission(Mission mission) throws SystemException;

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @param missionType
     * @return the specific MissionInstanceItemVo
     */
    InstanceDetailVo getInstanceByInstanceId(int instanceId, MissionType missionType);

    /**
     * get instance by instanceId
     *
     * @param missionId
     * @param missionType
     * @return the specific MissionInstanceItemVo
     */
    InstanceVo[] getInstancesByMissionId(int missionId, MissionType missionType);

    /**
     * get mission by mission id
     *
     * @param missionId   the id of the mission
     * @param missionType the type of the mission
     * @return the mission object
     */
    Mission getMissionByMissionId(int missionId, MissionType missionType);

    /**
     * update the mission's credits
     *
     * @param missionId
     * @param credits
     */
    void updateMission(int missionId, int credits);

    /**
     * finlize the instance
     *
     * @param instanceId
     * @param missionFinalizeVo
     */
    void updateInstance(int instanceId, MissionFinalizeVo missionFinalizeVo);


}
