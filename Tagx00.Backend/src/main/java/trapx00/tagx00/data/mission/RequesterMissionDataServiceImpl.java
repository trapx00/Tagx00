package trapx00.tagx00.data.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.dataservice.mission.RequesterMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;

@Service
public class RequesterMissionDataServiceImpl implements RequesterMissionDataService {
    /**
     * save mission
     *
     * @param missionVo
     */
    @Override
    public void saveMission(MissionVo missionVo) {

    }

    /**
     * get missionid by username
     *
     * @param username
     * @return the list of  the MissionRequesterQueryItemVo
     */
    @Override
    public MissionRequesterQueryItemVo[] getMissionByUsername(String username) {
        return new MissionRequesterQueryItemVo[0];
    }

    /**
     * get instance by instanceId
     *
     * @param instanceId
     * @return the specific MissionInstanceItemVo
     */
    @Override
    public MissionInstanceItemVo getInstanceById(int instanceId) {
        return null;
    }

    /**
     * get all instances of the user by username
     *
     * @param username
     * @return the list of missionIstanceItemVo
     */
    @Override
    public MissionInstanceItemVo[] getInstanceByUsername(String username) {
        return new MissionInstanceItemVo[0];
    }

    /**
     * get mission by mission id
     *
     * @param missionId the id of the mission
     * @return the mission object
     */
    @Override
    public Mission getMissionByMissionId(int missionId) {
        return null;
    }

    /**
     * get the instance by username and missionId
     *
     * @param username
     * @param missionId
     * @return the instance matching username and missionId
     */
    @Override
    public MissionInstanceItemVo getInstanceByUsernameAndMissionId(String username, int missionId) {
        return null;
    }
}
