package trapx00.tagx00.bl.upload;

import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.blservice.upload.MissionUploadBlService;
import trapx00.tagx00.response.upload.UploadMissionImageResponse;

public class MissionUploadBlServiceImpl implements MissionUploadBlService {

    /**
     * Upload the image of the mission
     * @param missionId
     * @param multipartFile
     * @param order
     * @param isCover
     * @return the url of the image
     */
    @Override
    public UploadMissionImageResponse uploadFiles(int missionId, MultipartFile multipartFile, int order, boolean isCover) {
        return null;
    }
}
