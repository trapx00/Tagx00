package trapx00.tagx00.data.dao.mission.instance;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.instance.ImageInstance;

import java.util.ArrayList;

public interface ImageInstanceDao extends JpaRepository<ImageInstance, Integer> {
    ArrayList<ImageInstance> findInstancesByMissionId(int missionId);

    ArrayList<ImageInstance> findImageInstancesByWorkerUsername(String workerUsername);

    ImageInstance findInstanceByInstanceId(int instanceId);
}
