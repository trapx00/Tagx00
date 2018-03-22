package trapx00.tagx00.data.dao.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.entity.mission.Instance;

import java.util.ArrayList;

@Service
public interface InstanceDao {
    Instance saveInstance(Instance imageInstance);

    ArrayList<Instance> findInstancesByMissionId(int missionId);

    ArrayList<Instance> findInstancesByWorkerUsername(String workerUsername);

    Instance findInstanceByInstanceId(int instanceId);

    Instance findInstanceByMissionIdAndWorkerUsername(int missionId, String workerUsername);

    boolean deleteInstance(int instanceid);
}
