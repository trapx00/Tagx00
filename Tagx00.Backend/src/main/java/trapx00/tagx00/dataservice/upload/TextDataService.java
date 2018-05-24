package trapx00.tagx00.dataservice.upload;

import trapx00.tagx00.exception.viewexception.SystemException;

import java.io.File;

public interface TextDataService {
    /**
     * upload the text to the oos cloud
     *
     * @param key  the id of the image
     * @param path the text content path
     * @return the url of the uploaded text
     */
    String uploadText(String key, File file) throws SystemException;

    /**
     * delete the text
     *
     * @param key the id of the text
     */
    void deleteText(String key);
}
