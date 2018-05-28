package trapx00.tagx00.data.upload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.data.dao.mission.TextTokenDao;
import trapx00.tagx00.dataservice.upload.TextDataService;
import trapx00.tagx00.entity.mission.TextToken;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.TextNotExistException;

import javax.sql.rowset.serial.SerialBlob;
import java.io.UnsupportedEncodingException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Optional;

@Service
public class TextDataServiceImpl implements TextDataService {
    private final TextTokenDao textTokenDao;

    @Autowired
    public TextDataServiceImpl(TextTokenDao textTokenDao) {
        this.textTokenDao = textTokenDao;
    }

    /**
     * save the text
     *
     * @param token the token of the text
     * @param text  the content of the text
     * @return the token of the uploaded text
     */
    @Override
    public String uploadText(String token, String text) throws SystemException {
        try {
            textTokenDao.save(new TextToken(token, new SerialBlob(text.getBytes("GBK"))));
        } catch (SQLException | UnsupportedEncodingException e) {
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
    public String getText(String token) throws TextNotExistException, SystemException {
        Optional<TextToken> optionalTextToken = textTokenDao.findById(token);
        if (optionalTextToken.isPresent()) {
            Blob blobText = optionalTextToken.get().getText();
            try {
                return new String(blobText.getBytes(1, (int) blobText.length()), "GBK");
            } catch (UnsupportedEncodingException | SQLException e) {
                e.printStackTrace();
                throw new SystemException();
            }
        } else {
            throw new TextNotExistException();
        }
    }

    /**
     * delete the text
     *
     * @param token the id of the text
     */
    @Override
    public void deleteText(String token) {
        textTokenDao.deleteById(token);
    }
}
