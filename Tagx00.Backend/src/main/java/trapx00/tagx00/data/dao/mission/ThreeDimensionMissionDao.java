package trapx00.tagx00.data.dao.mission;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.ThreeDimensionMission;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.VideoMission;

import java.util.ArrayList;

public interface ThreeDimensionMissionDao extends JpaRepository<ThreeDimensionMission, String> {

    ThreeDimensionMissionDao findTHreeDimensionMissionByMissionId(String missionId);

    ArrayList<ThreeDimensionMissionDao> findThreeDimensionMissionsByRequesterUsername(String requesterUsername);
}
