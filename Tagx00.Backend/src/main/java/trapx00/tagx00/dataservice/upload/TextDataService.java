package trapx00.tagx00.dataservice.upload;

import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.TextNotExistException;

import java.util.List;

public interface TextDataService {
    /**
     * save the text
     *
     * @param token the token of the text
     * @param text  the content of the text
     * @param words
     * @return the token of the uploaded text
     */
    String uploadText(String token, String text, List<String> words) throws SystemException;

    /**
     * get text by its token
     *
     * @param token
     * @return
     */
    String getText(String token) throws TextNotExistException, SystemException;

    /**
     * delete the text
     *
     * @param token the token of the text
     */
    void deleteText(String token);
}
