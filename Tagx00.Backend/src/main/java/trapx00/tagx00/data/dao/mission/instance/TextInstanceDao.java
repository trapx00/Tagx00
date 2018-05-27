package trapx00.tagx00.data.dao.mission.instance;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.instance.TextInstance;

import java.util.ArrayList;

public interface TextInstanceDao  extends JpaRepository<TextInstance, String> {

    ArrayList<TextInstance> findTextInstancesByMissionId(String missionId);

    ArrayList<TextInstance> findTextInstancesByWorkerUsername(String workerUsername);

    TextInstance findTextInstanceByInstanceId(String instanceId);
}
