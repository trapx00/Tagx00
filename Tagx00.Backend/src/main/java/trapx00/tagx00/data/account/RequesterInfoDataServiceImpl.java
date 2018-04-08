package trapx00.tagx00.data.account;

import org.springframework.stereotype.Service;
import trapx00.tagx00.dataservice.account.RequesterInfoDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;
import trapx00.tagx00.publicdatas.mission.MissionType;

@Service
public class RequesterInfoDataServiceImpl implements RequesterInfoDataService {

    /**
     * get missions by requesterUsername
     *
     * @param requesterUsername
     * @return
     */
    @Override
    public Mission[] getMissionsByRequesterUsername(String requesterUsername) {
        return new Mission[0];
    }

    /**
     * get instances by missionId
     *
     * @param missionId
     * @return
     */
    @Override
    public Instance[] getInstancesByMissionId(int missionId, MissionType missionType) {
        return new Instance[0];
    }
}
