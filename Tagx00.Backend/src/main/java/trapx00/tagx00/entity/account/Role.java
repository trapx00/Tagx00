package trapx00.tagx00.entity.account;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.Column;

public class Role extends Entity {
    public final static String WORKER_NAME = "ROLE_WORKER";

    public final static String REQUESTOR_NAME = "ROLE_REQUESTER";
    public final static Role WORKER = new Role(WORKER_NAME);
    public final static Role REQUESTOR = new Role(REQUESTOR_NAME);


    @Column(name = "name")
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
}
