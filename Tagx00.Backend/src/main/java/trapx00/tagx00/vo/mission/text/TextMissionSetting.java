package trapx00.tagx00.vo.mission.text;

import java.util.List;

public class TextMissionSetting {

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
