package trapx00.tagx00.response.user;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.security.jwt.JwtRole;

import java.util.Collection;

public class UserRegisterResponse extends Response {
    private String token;

    public UserRegisterResponse(String token) {


        this.token = token;
    }
}
