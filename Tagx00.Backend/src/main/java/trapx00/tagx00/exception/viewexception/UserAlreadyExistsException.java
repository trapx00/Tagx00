package trapx00.tagx00.exception.viewexception;

import trapx00.tagx00.vo.response.Response;

public class UserAlreadyExistsException extends Exception {
    private Response response = new Response(10002, "User already exists.");

    public Response getResponse() {
        return response;
    }
}