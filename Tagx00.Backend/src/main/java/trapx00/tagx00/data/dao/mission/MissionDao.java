package trapx00.tagx00.data.dao.mission;

import trapx00.tagx00.entity.mission.Mission;

import java.util.ArrayList;

public interface MissionDao {

    Mission saveMission(Mission mission);

    Mission findMissionByMissionId(int missionId);

    ArrayList<Mission> findMissionByRequesterUsername(String requesterUsername);

    ArrayList<Mission> findAll();
}
