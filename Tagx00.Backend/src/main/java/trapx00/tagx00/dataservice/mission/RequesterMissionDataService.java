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
    String saveMission(Mission mission) throws SystemException;

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @param missionType
     * @return the specific MissionInstanceItemVo
     */
    InstanceDetailVo getInstanceByInstanceId(String instanceId, MissionType missionType);

    /**
     * get instance by instanceId
     *
     * @param missionId
     * @param missionType
     * @return the instances
     */
    InstanceVo[] getInstancesByMissionId(String missionId, MissionType missionType);

    /**
     * get all instances
     *
     * @return the instances
     */
    InstanceVo[] getAllInstances();

    /**
     * get mission by mission id
     *
     * @param missionId   the id of the mission
     * @param missionType the type of the mission
     * @return the mission object
     */
    Mission getMissionByMissionId(String missionId, MissionType missionType);

    /**
     * update the mission's credits
     *  @param missionId
     * @param credits
     */
    void updateMission(String missionId, int credits, MissionType missionType) throws SystemException;

    /**
     * finlize the instance
     *  @param instanceId
     * @param missionFinalizeVo
     */
    void updateInstance(String instanceId, MissionFinalizeVo missionFinalizeVo, MissionType missionType) throws SystemException;
}
