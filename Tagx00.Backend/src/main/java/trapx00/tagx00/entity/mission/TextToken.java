package trapx00.tagx00.entity.mission;

import javax.persistence.*;
import java.sql.Blob;
import java.util.List;

@Entity
@Table(name = "textToken")
public class TextToken {
    @Id
    @Column(name = "token")
    private String token;
    @Column(name = "text")
    private Blob text;
    @Column(name = "segmentedSentence")
    @ElementCollection(targetClass = String.class)
    private List<String> segmentedSentence;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mission_missionId")
    private TextMission textMission;

    public TextToken() {
    }

    public TextToken(String token, Blob text, List<String> segmentedSentence) {
        this.token = token;
        this.text = text;
        this.segmentedSentence = segmentedSentence;
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

    public List<String> getSegmentedSentence() {
        return segmentedSentence;
    }

    public void setSegmentedSentence(List<String> segmentedSentence) {
        this.segmentedSentence = segmentedSentence;
    }
}
