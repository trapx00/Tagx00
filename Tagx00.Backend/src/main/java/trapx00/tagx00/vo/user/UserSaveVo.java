package trapx00.tagx00.vo.user;

import trapx00.tagx00.entity.account.Role;

import java.io.Serializable;

public class UserSaveVo implements Serializable {
    private String username;
    private String password;
    private String email;
    private Role role;

    public UserSaveVo() {
    }

    public UserSaveVo(String username, String password, String email, Role role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
