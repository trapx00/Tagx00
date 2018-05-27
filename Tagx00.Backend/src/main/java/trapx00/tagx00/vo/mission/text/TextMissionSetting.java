package trapx00.tagx00.vo.mission.text;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class TextMissionSetting implements Serializable {

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
