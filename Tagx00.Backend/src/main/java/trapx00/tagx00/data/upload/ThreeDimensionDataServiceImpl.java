package trapx00.tagx00.data.upload;

import trapx00.tagx00.dataservice.upload.ThreeDimensionDataService;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.ThreeDimensionNotExistException;
import trapx00.tagx00.response.mission.ThreeModel;

public class ThreeDimensionDataServiceImpl implements ThreeDimensionDataService {
    /**
     * save the text
     *
     * @param token the token of the text
     * @param text  the content of the text
     * @return the token of the uploaded text
     */
    @Override
    public String upload3d(String token, String text) throws SystemException {
        return null;
    }

    /**
     * get text by its token
     *
     * @param token
     * @return
     */
    @Override
    public ThreeModel get3d(String token) throws ThreeDimensionNotExistException, SystemException {
        return null;
    }

    /**
     * delete the text
     *
     * @param token the token of the text
     */
    @Override
    public void delete3d(String token) {

    }
}
