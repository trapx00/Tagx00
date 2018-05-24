package trapx00.tagx00.dataservice.mission;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

public interface PublicMissionDataService {

    /**
     * get all missions
     *
     * @return the list of missionPublicItemVo
     */
    MissionPublicItemVo[] getMissions();

    /**
     * get all MissionsInfo
     *
     * @return Mission
     */
    Mission[] getAllMissions();

    /**
     * get one mission detail
     *
     * @param missionId   the id of one mission
     * @param missionType
     * @return the missionDetailVo
     */
    MissionDetailVo getOneMissionDetail(String missionId, MissionType missionType);


    /**
     * get all InstanceInfo
     *
     * @return Instance
     */
    Instance[] getInstances();

    /**
     * add the browsing username to the mission
     *
     * @param missionId
     * @param username
     */
    void addBrowserUserToMission(String missionId, String username) throws MissionIdDoesNotExistException;
}
