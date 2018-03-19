package trapx00.tagx00.data.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.dataservice.mission.PublicMissionDataService;
import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

@Service
public class PublicMissionDataServiceImpl implements PublicMissionDataService {

    private final MissionDao missionDao;

    @Autowired
    public PublicMissionDataServiceImpl(MissionDao missionDao) {
        this.missionDao=missionDao;
    }

    /**
     * get all missions
     *
     * @return the list of missionPublicItemVo
     */
    @Override
    public MissionPublicItemVo[] getMissions() {
        Mission[]  missions=missionDao.getAllmission();
        if(missions==null)
            return null;
        MissionPublicItemVo[] result=new MissionPublicItemVo[missions.length];
        for(int i=0;i<missions.length;i++){
            result[i]=new MissionPublicItemVo(missions[i].getTitle(),missions[i].getTopics(), new MissionVo(MissionType.IMAGE),
                   missions[i].getStart(),missions[i].getEnd() );
        }
        return result;
    }
}
