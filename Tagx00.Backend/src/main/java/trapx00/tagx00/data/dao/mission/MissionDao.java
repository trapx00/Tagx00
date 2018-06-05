package trapx00.tagx00.data.dao.mission;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.List;

public interface MissionDao extends JpaRepository<Mission, String> {
    List<Mission> findMissionsByMissionType(MissionType missionType);
}
