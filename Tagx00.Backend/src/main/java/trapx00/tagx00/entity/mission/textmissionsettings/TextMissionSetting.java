package trapx00.tagx00.entity.mission.textmissionsettings;

import trapx00.tagx00.vo.mission.text.TextMissionType;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class TextMissionSetting implements Serializable {
    @Column(name = "textMissionType")
    private TextMissionType textMissionType;

    public TextMissionSetting() {
    }

    public TextMissionSetting(TextMissionType textMissionType) {
        this.textMissionType = textMissionType;
    }

    public TextMissionType getTextMissionType() {
        return textMissionType;
    }

    public void setTextMissionType(TextMissionType textMissionType) {
        this.textMissionType = textMissionType;
    }
}
