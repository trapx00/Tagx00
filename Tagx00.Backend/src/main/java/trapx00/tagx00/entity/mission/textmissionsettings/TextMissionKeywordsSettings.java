package trapx00.tagx00.entity.mission.textmissionsettings;

import trapx00.tagx00.vo.mission.text.TextMissionType;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import java.util.List;

@Embeddable
public class TextMissionKeywordsSettings extends TextMissionSetting {
    @Column(name = "keywords")
    @ElementCollection(targetClass = String.class)
    private List<String> keywords;

    public TextMissionKeywordsSettings() {
        super(TextMissionType.KEYWORDS);
    }

    public TextMissionKeywordsSettings(TextMissionType textMissionType, List<String> keywords) {
        super(textMissionType);
        this.keywords = keywords;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }
}
