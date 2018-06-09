package trapx00.tagx00.dataservice.upload;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.ThreeDimensionNotExistException;
import trapx00.tagx00.response.mission.ThreeModel;

public interface ThreeDimensionDataService {
    /**
     * save the 3d
     *
     * @param token the token of the text
     * @param text  the content of the text
     * @return the token of the uploaded text
     */
    String upload3d(String token, String text) throws SystemException;

    /**
     * get 3d by its token
     *
     * @param token
     * @return
     */
    ThreeModel get3d(String token) throws ThreeDimensionNotExistException, SystemException;

    /**
     * delete the 3d
     *
     * @param token the token of the text
     */
    void delete3d(String token);
}

