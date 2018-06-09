package trapx00.tagx00.entity.mission;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Blob;

@Entity
@Table(name = "threeDimensionToken")
public class ThreeDimensionToken {
    @Id
    @Column(name = "token")
    private String token;
    @Column(name = "mtl")
    private Blob mtl;
    @Column(name = "obj")
    private Blob obj;

    public ThreeDimensionToken() {
    }

    public ThreeDimensionToken(String token, Blob mtl, Blob obj) {
        this.token = token;
        this.mtl = mtl;
        this.obj = obj;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Blob getMtl() {
        return mtl;
    }

    public void setMtl(Blob mtl) {
        this.mtl = mtl;
    }

    public Blob getObj() {
        return obj;
    }

    public void setObj(Blob obj) {
        this.obj = obj;
    }
}
