package trapx00.tagx00.blservice.upload;

import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.upload.UploadMissionImageResponse;

import java.io.IOException;

public interface MissionUploadBlService {
    /**
     * Upload the image of the mission
     * @param missionId
     * @param multipartFile
     * @param order
     * @param isCover
     * @return the url of the image
     */
    UploadMissionImageResponse uploadFiles(int missionId, MultipartFile multipartFile,int order,boolean isCover) throws IOException, SystemException;
}
