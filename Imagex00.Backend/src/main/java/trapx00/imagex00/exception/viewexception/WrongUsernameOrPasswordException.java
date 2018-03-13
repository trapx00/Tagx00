package trapx00.imagex00.exception.viewexception;

import trapx00.imagex00.vo.response.Response;

public class WrongUsernameOrPasswordException extends Exception {
    private Response response = new Response(10003, "Username or password is wrong.");

    public Response getResponse() {
        return response;
    }
}
