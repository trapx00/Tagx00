package trapx00.tagx00.data.dao.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.entity.mission.Instance;
@Service
public interface InstanceDao {
    Instance saveInstance(Instance instance);

    Instance[] findInstancesBymissionId(int missionId);

    Instance[] findInstanceByWorkerUsername(String workerusername);

    Instance findInstanceByinstanceId(int instanceId);

    boolean deleteInstance(int instanceid);
}
