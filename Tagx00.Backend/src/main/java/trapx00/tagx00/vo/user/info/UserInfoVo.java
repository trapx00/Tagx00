package trapx00.tagx00.vo.user.info;

import trapx00.tagx00.entity.account.Role;

import java.io.Serializable;

public class UserInfoVo implements Serializable {
    private String username;
    private String email;
    private String role;
    private String registerDate;
    private String avatarUrl;

    public UserInfoVo(String username, String email, String role, String registerDate, String avatarUrl) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.registerDate = registerDate;
        this.avatarUrl = avatarUrl;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(String registerDate) {
        this.registerDate = registerDate;
    }
}
