package trapx00.tagx00.blservice.upload;

import org.springframework.web.multipart.MultipartFile;
import trapx00.tagx00.exception.viewexception.MissionIdDoesNotExistException;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.response.upload.UploadMissionImageResponse;
import trapx00.tagx00.response.upload.UploadMissionTextResponse;

public interface MissionUploadBlService {
    /**
     * Upload the image of the mission
     *
     * @param isCover
     * @param missionId
     * @param multipartFile
     * @param order
     * @return the url of the image
     */
    UploadMissionImageResponse uploadImage(String missionId, MultipartFile multipartFile, int order, boolean isCover) throws SystemException, MissionIdDoesNotExistException;

    /**
     * Upload the text of the mission
     *
     * @param missionId
     * @param multipartFile
     * @return the urls of the texts
     */
    UploadMissionTextResponse uploadText(String missionId, MultipartFile multipartFile) throws SystemException, MissionIdDoesNotExistException;




}
