package trapx00.tagx00.bl.upload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.upload.MissionUploadBlService;
import trapx00.tagx00.dataservice.upload.ImageDataService;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.upload.UploadMissionImageResponse;

import java.io.IOException;

@Service
public class MissionUploadBlServiceImpl implements MissionUploadBlService {

    private final ImageDataService imageDataService;

    @Autowired
    public MissionUploadBlServiceImpl(ImageDataService imageDataService) {
        this.imageDataService = imageDataService;
    }

    /**
     * Upload the image of the mission
     *
     * @param missionId
     * @param multipartFile
     * @param order
     * @param isCover
     * @return the url of the image
     */
    @Override
    public UploadMissionImageResponse uploadFiles(int missionId, MultipartFile multipartFile, int order, boolean isCover) throws SystemException {
        try {
            imageDataService.uploadImage(generateImageKey(missionId, order, isCover), multipartFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        return null;
    }

    private String generateImageKey(int missionId, int order, boolean isCover) {
        if (isCover) {
            return "image_cover" + missionId;
        } else {
            return "image_" + missionId + "_" + order;
        }
    }
}
