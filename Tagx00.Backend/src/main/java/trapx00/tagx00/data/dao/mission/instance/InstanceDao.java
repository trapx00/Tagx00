package trapx00.tagx00.data.dao.mission.instance;

import trapx00.tagx00.entity.mission.instance.Instance;

import java.util.ArrayList;

public interface InstanceDao {
    Instance saveInstance(Instance imageInstance);

    ArrayList<Instance> findInstancesByMissionId(int missionId);

    ArrayList<Instance> findInstancesByWorkerUsername(String workerUsername);

    Instance findInstanceByInstanceId(int instanceId);

    boolean deleteInstance(int instanceid);
}
