package trapx00.imagex00.entity.user;


import trapx00.imagex00.entity.annotation.*;
import trapx00.imagex00.entity.Entity;

@Table(name = "user")
public class User extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
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
}
