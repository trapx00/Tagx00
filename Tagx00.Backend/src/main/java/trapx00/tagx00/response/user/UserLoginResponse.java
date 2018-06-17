package trapx00.tagx00.response.user;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.security.jwt.JwtRole;

import java.sql.Date;
import java.util.Collection;

public class UserLoginResponse extends Response {
    private String token;
    private Collection<JwtRole> jwtRoles;
    private String email;
    private String avatarUrl;
    private Date registerDate;

    public UserLoginResponse() {
    }

    public UserLoginResponse(String token, Collection<JwtRole> jwtRoles, String email, String avatarUrl, Date registerDate) {
        this.token = token;
        this.jwtRoles = jwtRoles;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.registerDate = registerDate;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Collection<JwtRole> getJwtRoles() {
        return jwtRoles;
    }

    public void setJwtRoles(Collection<JwtRole> jwtRoles) {
        this.jwtRoles = jwtRoles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
