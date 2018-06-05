package trapx00.tagx00.data.dao.mission;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.VideoMission;

import java.util.ArrayList;

public interface AudioMissionDao extends JpaRepository<AudioMissionDao, String> {

    AudioMissionDao findAudioMissionByMissionId(String missionId);

    ArrayList<AudioMissionDao> findAudioMissionsByRequesterUsername(String requesterUsername);
}
