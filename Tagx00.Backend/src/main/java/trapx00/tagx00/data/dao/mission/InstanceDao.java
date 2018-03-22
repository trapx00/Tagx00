package trapx00.tagx00.data.dao.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.entity.mission.ImageInstance;
import trapx00.tagx00.entity.mission.Instance;

@Service
public interface InstanceDao {
    Instance saveInstance(Instance imageInstance);

    Instance[] findInstancesByissionId(int missionId);

    Instance[] findInstanceByWorkerUsername(String workerusername);

    Instance findInstanceBynstanceId(int instanceId);

    Instance findInstanceBymissionIdndWorkerUsername(int missionId,String workerusername);

    boolean deleteInstance(int instanceid);
}
