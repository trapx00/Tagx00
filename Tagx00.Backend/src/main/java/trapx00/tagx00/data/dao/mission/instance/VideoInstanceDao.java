package trapx00.tagx00.data.dao.mission.instance;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.instance.AudioInstance;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.entity.mission.instance.VideoInstance;

import java.util.ArrayList;

public interface VideoInstanceDao extends JpaRepository<VideoInstance, String>{
    ArrayList<VideoInstance> findVideoInstancesByMissionId(String missionId);

    ArrayList<VideoInstance> findVideoInstancesByWorkerUsername(String workerUsername);

    VideoInstance findVideoInstanceByInstanceId(String instanceId);
}
