package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;

public interface RequesterMissionDataService {

    /**
     * save mission

     * @param mission
     */
    void saveMission (Mission mission)throws SystemException;


    /**
     * get missionid by username
     *
     * @param username
     * @return the list of  the MissionRequesterQueryItemVo
     */
    MissionRequesterQueryItemVo[] getMissionByUsername(String username);

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @return the specific MissionInstanceItemVo
     */
    MissionInstanceItemVo getInstanceById(int instanceId);


    /**
     * get all instances of the user by username
     *
     * @param username
     * @return the list of missionIstanceItemVo
     */
    MissionInstanceItemVo[] getInstanceByUsername(String username);

    /**
     * get mission by mission id
     *
     * @param missionId the id of the mission
     * @return the mission object
     */
    Mission getMissionByMissionId(int missionId);

    /**
     * get the instance by username and missionId
     *
     * @param username
     * @param missionId
     * @return the instance matching username and missionId
     */
    MissionInstanceItemVo getInstanceByUsernameAndMissionId(String username, int missionId);

}
