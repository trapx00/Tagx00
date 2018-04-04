package trapx00.tagx00.data.daoimpl.mission.instance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.instance.ImageInstanceDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.mission.ImageMission;
import trapx00.tagx00.entity.mission.instance.ImageInstance;

import java.util.ArrayList;

@Service
public class ImageInstanceDaoImpl implements ImageInstanceDao {

    private final FileService<ImageInstance> imageInstanceFileService;
    private final FileService<ImageMission> imageMissionFileService;

    @Autowired
    public ImageInstanceDaoImpl(FileService<ImageInstance> imageInstanceFileService, FileService<ImageMission> imageMissionFileService) {
        this.imageInstanceFileService = imageInstanceFileService;
        this.imageMissionFileService = imageMissionFileService;
    }


    @Override
    public ImageInstance saveInstance(ImageInstance imageInstance) {
        return imageInstanceFileService.saveTuple(imageInstance);
    }

    @Override
    public ArrayList<ImageInstance> findInstancesByMissionId(int missionId) {
        return imageInstanceFileService.findOnes(String.valueOf(missionId), ImageInstance.class);
    }

    @Override
    public ArrayList<ImageInstance> findImageInstancesByWorkerUsername(String workerUsername) {
        return imageInstanceFileService.findOnes(workerUsername, ImageInstance.class);
    }

    @Override
    public ImageInstance findInstanceByInstanceId(int instanceId) {
        return imageInstanceFileService.findOne(String.valueOf(instanceId), ImageInstance.class);
    }

    @Override
    public boolean deleteInstance(int instanceId) {
        imageInstanceFileService.delete(String.valueOf(instanceId), ImageInstance.class);
        return true;
    }
}
