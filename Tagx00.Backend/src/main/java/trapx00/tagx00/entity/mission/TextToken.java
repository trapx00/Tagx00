package trapx00.tagx00.entity.mission;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Blob;

@Entity
@Table(name = "textToken")
public class TextToken {
    @Id
    @Column(name = "token")
    private String token;
    @Column(name = "text")
    private Blob text;

    public TextToken() {
    }

    public TextToken(String token, Blob text) {
        this.token = token;
        this.text = text;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Blob getText() {
        return text;
    }

    public void setText(Blob text) {
        this.text = text;
    }
}
