package trapx00.tagx00.entity.account;

import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
public class Role {
    public final static String WORKER_NAME = "ROLE_WORKER";
    public final static String REQUESTER_NAME = "ROLE_REQUESTER";
    public final static String ADMIN_NAME = "ROLE_ADMIN";
    public final static Role WORKER = new Role(WORKER_NAME);
    public final static Role REQUESTER = new Role(REQUESTER_NAME);
    public final static Role ADMIN = new Role(ADMIN_NAME);

    private String name;

    public Role() {

    }

    public Role(String name) {
        this.name = name;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Role)) return false;
        Role role = (Role) o;
        return Objects.equals(getName(), role.getName());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getName());
    }
}
