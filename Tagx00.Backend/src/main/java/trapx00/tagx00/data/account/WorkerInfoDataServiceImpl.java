package trapx00.tagx00.data.account;

import trapx00.tagx00.dataservice.account.WorkerInfoDataService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.instance.Instance;

public class WorkerInfoDataServiceImpl implements WorkerInfoDataService {


    @Override
    public User getUserByUsername(String username) {
        return null;
    }

    @Override
    public Instance[] getInstanceByWorkerUsername(String workerUsername) {
        return new Instance[0];
    }
}
