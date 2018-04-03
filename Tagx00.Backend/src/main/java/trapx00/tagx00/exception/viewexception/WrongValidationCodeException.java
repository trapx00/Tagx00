package trapx00.tagx00.exception.viewexception;

import trapx00.tagx00.response.WrongResponse;

public class WrongValidationCodeException extends Exception {
    private WrongResponse response = new WrongResponse(10010, "The validation code is wrong.");

    public WrongResponse getResponse() {
        return response;
    }
}
