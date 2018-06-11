package trapx00.tagx00.dataservice.upload;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.TextNotExistException;

public interface VideoDataService {
    /**
     * upload the video to the oos cloud
     *
     * @param key   the id of the image
     * @param bytes the image content
     * @return the url of the uploaded image
     */
    String uploadVideo(String key, byte[] bytes) throws SystemException;

    /**
     * delete the video
     *
     * @param key the id of the video
     */
    void deleteVideo(String key);
}
