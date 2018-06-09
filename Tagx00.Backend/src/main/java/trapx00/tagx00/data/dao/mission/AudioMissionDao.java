package trapx00.tagx00.data.dao.mission;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.AudioMission;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.VideoMission;

import java.util.ArrayList;

public interface AudioMissionDao extends JpaRepository<AudioMission, String> {

    AudioMission findAudioMissionByMissionId(String missionId);

    ArrayList<AudioMission> findAudioMissionsByRequesterUsername(String requesterUsername);
}
