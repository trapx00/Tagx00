package trapx00.tagx00.data.account;

import org.springframework.stereotype.Service;
import trapx00.tagx00.dataservice.account.WorkerInfoDataService;
import trapx00.tagx00.entity.mission.instance.Instance;

@Service
public class WorkerInfoDataServiceImpl implements WorkerInfoDataService {


    @Override
    public Instance[] getInstanceByWorkerUsername(String workerUsername) {
        return new Instance[0];
    }
}
