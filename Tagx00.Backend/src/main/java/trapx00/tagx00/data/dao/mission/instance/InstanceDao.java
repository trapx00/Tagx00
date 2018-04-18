package trapx00.tagx00.data.dao.mission.instance;

import java.util.ArrayList;

public interface InstanceDao<T> {
    T saveInstance(T imageInstance);

    ArrayList<T> findInstancesByMissionId(int missionId);

    ArrayList<T> findImageInstancesByWorkerUsername(String workerUsername);

    ArrayList<T> findAll();

    T findInstanceByInstanceId(int instanceId);

    boolean deleteInstance(int instanceid);
}
