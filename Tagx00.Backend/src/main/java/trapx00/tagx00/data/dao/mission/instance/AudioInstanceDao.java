package trapx00.tagx00.data.dao.mission.instance;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.instance.AudioInstance;
import trapx00.tagx00.entity.mission.instance.ImageInstance;

import java.util.ArrayList;

public interface AudioInstanceDao extends JpaRepository<AudioInstance, String> {
    ArrayList<AudioInstance> findAudioInstancesByMissionId(String missionId);

    ArrayList<AudioInstance> findAudioInstancesByWorkerUsername(String workerUsername);

    AudioInstance findAudioInstanceByInstanceId(String instanceId);
}
