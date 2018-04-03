package trapx00.tagx00.exception.viewexception;

import trapx00.tagx00.response.WrongResponse;

public class UserDoesNotExistException extends Exception {
    private WrongResponse response = new WrongResponse(10009, "User does not exist.");

    public WrongResponse getResponse() {
        return response;
    }
}
