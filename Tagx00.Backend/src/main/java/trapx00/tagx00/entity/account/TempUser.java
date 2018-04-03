package trapx00.tagx00.entity.account;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.ElementCollection;
import trapx00.tagx00.entity.annotation.Id;

import java.util.List;

public class TempUser {
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
}
