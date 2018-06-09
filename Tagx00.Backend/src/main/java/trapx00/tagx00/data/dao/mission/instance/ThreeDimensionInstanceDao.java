package trapx00.tagx00.data.dao.mission.instance;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.instance.AudioInstance;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.ThreeDimensionInstance;

import java.util.ArrayList;

public interface ThreeDimensionInstanceDao extends JpaRepository<ThreeDimensionInstance, String> {
    ArrayList<ThreeDimensionInstance> findThreeDimensionInstancesByMissionId(String missionId);

    ArrayList<ThreeDimensionInstance> findThreeDimensionInstancesByWorkerUsername(String workerUsername);

    ThreeDimensionInstance findThreeDimensionInstanceByInstanceId(String instanceId);
}
