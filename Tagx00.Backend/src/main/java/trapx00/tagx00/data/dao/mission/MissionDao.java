package trapx00.tagx00.data.dao.mission;

import java.util.ArrayList;

public interface MissionDao<T> {

    T saveMission(T mission);

    T findMissionByMissionId(int missionId);

    ArrayList<T> findMissionByRequesterUsername(String requesterUsername);

    ArrayList<T> findAll();
}
