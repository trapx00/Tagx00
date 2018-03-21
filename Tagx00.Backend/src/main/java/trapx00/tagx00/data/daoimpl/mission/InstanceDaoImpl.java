package trapx00.tagx00.data.daoimpl.mission;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.data.dao.mission.InstanceDao;
import trapx00.tagx00.data.fileservice.FileService;
import trapx00.tagx00.entity.mission.ImageInstance;

public class InstanceDaoImpl implements InstanceDao {

    private final FileService<ImageInstance> fileService;

    @Autowired
    public InstanceDaoImpl(FileService<ImageInstance> fileService) {
        this.fileService = fileService;
    }


    @Override
    public ImageInstance saveInstance(ImageInstance imageInstance) {
        return fileService.saveTuple(imageInstance);
    }

    @Override
    public ImageInstance[] findInstancesBymissionId(int missionId) {

        return  fileService.findOnes(String.valueOf(missionId),ImageInstance.class);
    }

    @Override
    public ImageInstance[] findInstanceByWorkerUsername(String workerusername) {

        return fileService.findOnes(workerusername,ImageInstance.class);
    }

    @Override
    public ImageInstance findInstanceByinstanceId(int instanceId) {
        return fileService.findOne(String.valueOf(instanceId), ImageInstance.class);
    }

    @Override
    public boolean deleteInstance(int instanceid) {
        fileService.delete(String.valueOf(instanceid),ImageInstance.class);
        return true;
    }
}
