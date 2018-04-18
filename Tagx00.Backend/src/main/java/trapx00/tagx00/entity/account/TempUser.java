package trapx00.tagx00.entity.account;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.ElementCollection;
import trapx00.tagx00.entity.annotation.Id;
import trapx00.tagx00.entity.annotation.Table;

import java.util.List;

@Table(name = "tempUser")
public class TempUser extends Entity {
    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @ElementCollection(targetClass = Role.class)
    @Column(name = "roles")
    private List<Role> roles;
    @Column(name = "validationCode")
    private String validationCode;

    public TempUser() {
    }

    public TempUser(String username, String password, String email, List<Role> roles, String validationCode) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
        this.validationCode = validationCode;
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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getValidationCode() {
        return validationCode;
    }

    public void setValidationCode(String validationCode) {
        this.validationCode = validationCode;
    }
}
