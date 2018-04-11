package trapx00.tagx00.dataservice.admin;

import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;

public interface AdminInfoDataService {

    /**
     * get all userInfo
     *
     * @return
     */
    User[] getUsers();

    /**
     * get all MissionsInfo
     *
     * @return Mission
     */
    Mission[] getMissions();

    /**
     * get all InstanceInfo
     *
     * @return Instance
     */
    Instance[] getInstances();
}
