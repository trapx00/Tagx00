package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.mission.requester.MissionFinalizeVo;

import java.io.IOException;

public interface RequesterMissionDataService {

    /**
     * update mission
     *
     * @param mission
     */
    String updateMission(Mission mission) throws SystemException, IOException;

    /**
     * save mission
     *
     * @param mission
     */
    String saveMission(Mission mission) throws SystemException, IOException;

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
    InstanceVo[] getAllInstances(String username);

    /**
     * get mission by id
     *
     * @param missionId
     * @return
     */
    Mission getMissionByMissionId(String missionId) throws MissionIdDoesNotExistException, IOException, ClassNotFoundException;

    /**
     * update the mission's credits
     *
     * @param missionId
     * @param credits
     */
    void updateMission(String missionId, int credits, MissionType missionType) throws SystemException, IOException, MissionIdDoesNotExistException, ClassNotFoundException;

    /**
     * finalize the instance
     *
     * @param instanceId
     * @param missionFinalizeVo
     */
    void updateInstance(String instanceId, MissionFinalizeVo missionFinalizeVo, MissionType missionType) throws SystemException;

    /**
     * get the latest mission's id
     *
     * @param missionType
     * @return
     */
    int getLatestMissionId(MissionType missionType);
}
