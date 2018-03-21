package trapx00.tagx00.data.dao.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.entity.mission.ImageInstance;
@Service
public interface InstanceDao {
    ImageInstance saveInstance(ImageInstance imageInstance);

    ImageInstance[] findInstancesBymissionId(int missionId);

    ImageInstance[] findInstanceByWorkerUsername(String workerusername);

    ImageInstance findInstanceByinstanceId(int instanceId);

    boolean deleteInstance(int instanceid);
}
