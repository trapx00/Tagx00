package trapx00.tagx00.bl.mission;

import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.response.mission.MissionPublicResponse;

@Service
public class PublicMissionBlServiceImpl implements PublicMissionBlService {
    /**
     * get All missions
     *
     * @return the list of MissionPublicItemVo
     */
    @Override
    public MissionPublicResponse getAllMissions() {
        return null;
    }
}
