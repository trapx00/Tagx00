package trapx00.tagx00.bl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.blservice.mission.PublicMissionBlService;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.NotMissionException;
import trapx00.tagx00.response.mission.MissionPublicResponse;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Arrays;

@Service
public class PublicMissionBlServiceImpl implements PublicMissionBlService {

    private final PublicMissionDataService publicMissionDataService;
    @Autowired
    public PublicMissionBlServiceImpl(PublicMissionDataService publicMissionDataService){
     this.publicMissionDataService=publicMissionDataService;

    }
    /**
     * get All missions
     *
     * @return the list of MissionPublicItemVo
     */
    @Override
    public MissionPublicResponse getAllMissions() throws NotMissionException{

        MissionPublicItemVo[] missionPublicItemVos=publicMissionDataService.getMissions();
        if(missionPublicItemVos==null){
             throw new NotMissionException();
        }

        return new MissionPublicResponse(Arrays.asList(missionPublicItemVos));
    }
}
