package trapx00.tagx00.exception.viewexception;

import trapx00.tagx00.response.WrongResponse;

public class ThreeDimensionNotExistException extends Exception {

    private WrongResponse response = new WrongResponse(10020, "The 3d of token does not exist.");

    public WrongResponse getResponse() {
        return response;
    }
}
