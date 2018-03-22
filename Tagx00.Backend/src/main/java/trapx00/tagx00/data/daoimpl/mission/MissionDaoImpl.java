package trapx00.tagx00.data.daoimpl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.MissionDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.mission.Mission;

import java.util.ArrayList;


@Service
public class MissionDaoImpl implements MissionDao {

    private final FileService<Mission> fileService;

    @Autowired
    public MissionDaoImpl(FileService<Mission> fileService) {
        this.fileService = fileService;
    }


    @Override
    public Mission saveMission(Mission mission) {
        return fileService.saveTuple(mission);
    }

    @Override
    public Mission findMissionByMissionId(int missionId) {
        return fileService.findOne(String.valueOf(missionId), Mission.class);
        /**
         * 有点问题
         */
    }

    @Override
    public Mission[] findMissionByRequesterUsername(String requesterUsername) {
        return fileService.findOnes(requesterUsername, Mission.class);
    }

    @Override
    public ArrayList<Mission> findAll() {
        return fileService.findAll(Mission.class);
    }


}
