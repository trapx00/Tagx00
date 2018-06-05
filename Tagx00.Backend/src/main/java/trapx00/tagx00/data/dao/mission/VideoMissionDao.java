package trapx00.tagx00.data.dao.mission;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.VideoMission;

import java.util.ArrayList;

public interface VideoMissionDao extends JpaRepository<VideoMission, String> {

    VideoMission findVideoMissionByMissionId(String missionId);

    ArrayList<VideoMission> findVideoMissionsByRequesterUsername(String requesterUsername);
}
