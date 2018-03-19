package trapx00.tagx00.data.dao.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.entity.mission.Instance;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;
@Service
public interface MissionDao {

    Mission  saveMssion(Mission mission);

    Mission  findMissionByMissionId(int missionId);

    Mission[] findMissionByusername(String username);

    Mission[] getAllmission();



}
