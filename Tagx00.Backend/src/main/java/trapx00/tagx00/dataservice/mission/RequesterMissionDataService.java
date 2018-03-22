package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

public interface RequesterMissionDataService {

    /**
     * save mission

     * @param mission
     */
    int saveMission (Mission mission)throws SystemException;

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @return the specific MissionInstanceItemVo
     */
    InstanceDetailVo getInstanceByinstanceId(int instanceId);
    /**
     * get instance by instanceId
     *
     * @param missionId
     * @return the specific MissionInstanceItemVo
     */
    InstanceVo[] getInstanceBymissionId(int missionId);

    /**
     * get mission by mission id
     *
     * @param missionId the id of the mission
     * @return the mission object
     */
    Mission getMissionByMissionId(int missionId);



}
