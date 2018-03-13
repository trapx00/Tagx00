package trapx00.tagx00.entity.user;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.Column;

public class Role extends Entity {
    public final static String WORKER_NAME = "WORKER";

    public final static String REQUESTOR_NAME = "REQUESTOR";
    public final static Role WORKER = new Role(WORKER_NAME);
    public final static Role REQUESTOR = new Role(REQUESTOR_NAME);



    @Column(name = "name")
    public final String name;

    private Role(String name) {
        this.name = name;
    }


    public String getName() {
        return name;
    }
}
