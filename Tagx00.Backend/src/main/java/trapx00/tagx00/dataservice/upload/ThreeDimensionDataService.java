package trapx00.tagx00.dataservice.upload;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.ThreeDimensionNotExistException;
import trapx00.tagx00.response.mission.ThreeModel;

public interface ThreeDimensionDataService {
    /**
     * save the text
     *
     * @param token the token of the text
     * @param text  the content of the text
     * @return the token of the uploaded text
     */
    String uploadText(String token, String text) throws SystemException;

    /**
     * get text by its token
     *
     * @param token
     * @return
     */
    ThreeModel get3d(String token) throws ThreeDimensionNotExistException, SystemException;

    /**
     * delete the text
     *
     * @param token the token of the text
     */
    void deleteText(String token);
}

