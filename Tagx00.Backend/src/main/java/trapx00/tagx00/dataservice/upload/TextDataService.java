package trapx00.tagx00.dataservice.upload;

import trapx00.tagx00.exception.viewexception.TextNotExistException;

public interface TextDataService {
    /**
     * save the text
     *
     * @param token the token of the text
     * @param text  the content of the text
     * @return the token of the uploaded text
     */
    String uploadText(String token, String text);

    /**
     * get text by its token
     *
     * @param token
     * @return
     */
    String getText(String token) throws TextNotExistException;

    /**
     * delete the text
     *
     * @param token the token of the text
     */
    void deleteText(String token);
}
