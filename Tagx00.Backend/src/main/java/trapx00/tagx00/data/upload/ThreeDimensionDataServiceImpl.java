package trapx00.tagx00.data.upload;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.data.dao.mission.ThreeDimensionTokenDao;
import trapx00.tagx00.dataservice.upload.ThreeDimensionDataService;
import trapx00.tagx00.entity.mission.TextToken;
import trapx00.tagx00.entity.mission.ThreeDimensionToken;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.ThreeDimensionNotExistException;
import trapx00.tagx00.response.mission.ThreeModel;

import javax.sql.rowset.serial.SerialBlob;
import java.io.UnsupportedEncodingException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Optional;

public class ThreeDimensionDataServiceImpl implements ThreeDimensionDataService {
    private final ThreeDimensionTokenDao threeDimensionTokenDao;
    private static int tag=0;
    private static SerialBlob mtl;
    private static SerialBlob obj;

    @Autowired
    public ThreeDimensionDataServiceImpl(ThreeDimensionTokenDao threeDimensionTokenDao) {
        this.threeDimensionTokenDao = threeDimensionTokenDao;
    }

    /**
     * save the 3d
     *
     * @param token the token of the 3d
     * @param bytes  the content of the 3d
     * @return the token of the uploaded 3d
     */
    @Override
    public String upload3d(String token, byte[] bytes) throws SystemException {
        try {
            if(tag==0){
                mtl=new SerialBlob(bytes);
                tag++;
            }
            else if(tag==1){
                obj=new SerialBlob(bytes);
                tag--;
                threeDimensionTokenDao.save(new ThreeDimensionToken(token, mtl,obj));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new SystemException();
        }
        return token;
    }

    /**
     * get text by its token
     *
     * @param token
     * @return
     */
    @Override
    public ThreeModel get3d(String token) throws ThreeDimensionNotExistException, SystemException {
        Optional<ThreeDimensionToken> optionalThreeDimensionToken = threeDimensionTokenDao.findById(token);
        if (optionalThreeDimensionToken.isPresent()) {
            Blob blobMtl = optionalThreeDimensionToken.get().getMtl();
            Blob blobObj=optionalThreeDimensionToken.get().getObj();
            try {
                return new ThreeModel(new String(blobMtl.getBytes(1, (int) blobMtl.length())),
                        new String(blobObj.getBytes(1, (int) blobObj.length()))) ;
            } catch ( SQLException e) {
                e.printStackTrace();
                throw new SystemException();
            }
        } else {
            throw new ThreeDimensionNotExistException();
        }
    }

    /**
     * delete the text
     *
     * @param token the token of the text
     */
    @Override
    public void delete3d(String token) {
        threeDimensionTokenDao.deleteById(token);
    }
}
