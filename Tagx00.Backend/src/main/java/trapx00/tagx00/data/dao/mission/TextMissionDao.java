package trapx00.tagx00.data.dao.mission;

import org.springframework.data.jpa.repository.JpaRepository;
import trapx00.tagx00.entity.mission.TextMission;

import javax.xml.soap.Text;
import java.util.ArrayList;

public interface TextMissionDao extends JpaRepository<TextMission,String> {
    TextMission findTextMissionByMissionId(String missionId);

    ArrayList<TextMission> findTextMissionsByRequesterUsername(String requesterUsername);
}
