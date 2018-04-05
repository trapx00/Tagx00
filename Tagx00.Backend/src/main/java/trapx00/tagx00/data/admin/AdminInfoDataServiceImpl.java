package trapx00.tagx00.data.admin;

import trapx00.tagx00.dataservice.admin.AdminInfoDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.instance.Instance;

public class AdminInfoDataServiceImpl implements AdminInfoDataService {
    /**
     * get all userInfo
     *
     * @return
     */
    @Override
    public User[] getUsers() {
        return new User[0];
    }

    /**
     * get all MissionsInfo
     *
     * @return Mission
     */
    @Override
    public Mission[] getMissions() {
        return new Mission[0];
    }

    /**
     * get all InstanceInfo
     *
     * @return Instance
     */
    @Override
    public Instance[] getInstances() {
        return new Instance[0];
    }
}
