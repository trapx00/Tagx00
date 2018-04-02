package trapx00.tagx00.dataservice.account;

import org.springframework.security.core.userdetails.UserDetailsService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Instance;

public interface WorkerInfoDataService {

    User getUserByUsername(String username);
    Instance[] getInstanceByWorkerUsername(String workerUsername);
}
