package trapx00.tagx00.entity.mission;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "textToken")
public class TextToken {
    @Id
    @Column(name = "token")
    private String token;
    @Column(name = "text")
    private String text;

    public TextToken() {
    }

    public TextToken(String token, String text) {
        this.token = token;
        this.text = text;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
