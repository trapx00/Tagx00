package trapx00.tagx00.dataservice.account;

import org.springframework.security.core.userdetails.UserDetailsService;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.entity.mission.Instance;

public interface WorkerInfoDataService {

    /**
     *
     * @param username
     * @return
     */
    User getUserByUsername(String username);

    /**
     *
     * @param workerUsername
     * @return
     */
    Instance[] getInstanceByWorkerUsername(String workerUsername);
}
