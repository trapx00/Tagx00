package trapx00.tagx00.exception.viewexception;

import trapx00.tagx00.response.WrongResponse;

public class NoMoreInstanceException extends Exception {
    private WrongResponse response = new WrongResponse(10012, "There is no more instances.");

    public WrongResponse getResponse() {
        return response;
    }
}
