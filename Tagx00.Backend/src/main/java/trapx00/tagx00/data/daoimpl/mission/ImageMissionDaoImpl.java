package trapx00.tagx00.data.daoimpl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.ImageMissionDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.mission.ImageMission;

import java.util.ArrayList;


@Service
public class ImageMissionDaoImpl implements ImageMissionDao {

    private final FileService<ImageMission> fileService;

    @Autowired
    public ImageMissionDaoImpl(FileService<ImageMission> fileService) {
        this.fileService = fileService;
    }


    @Override
    public ImageMission saveMission(ImageMission imageMission) {
        return fileService.saveTuple(imageMission);
    }

    @Override
    public ImageMission findMissionByMissionId(int missionId) {
        return fileService.findOne(String.valueOf(missionId), ImageMission.class);
        /**
         * 有点问题
         */
    }

    @Override
    public ArrayList<ImageMission> findMissionByRequesterUsername(String requesterUsername) {
        return fileService.findOnes(requesterUsername, ImageMission.class);
    }

    @Override
    public ArrayList<ImageMission> findAll() {
        return fileService.findAll(ImageMission.class);
    }


}
