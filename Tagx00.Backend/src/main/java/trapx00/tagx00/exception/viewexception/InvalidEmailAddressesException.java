package trapx00.tagx00.exception.viewexception;

import trapx00.tagx00.response.WrongResponse;

public class InvalidEmailAddressesException extends Exception {
    private WrongResponse response = new WrongResponse(10012, "The email address is invalid.");

    public WrongResponse getResponse() {
        return response;
    }
}
