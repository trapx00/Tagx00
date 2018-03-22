package trapx00.tagx00.data.dao.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.entity.mission.Mission;

@Service
public interface MissionDao {

    Mission  saveMssion(Mission mission);

    Mission findMissionBymissionId(int missionId);

    Mission[] findMissionByrequesterUsername(String username);

    Mission[] getAllmission();



}
