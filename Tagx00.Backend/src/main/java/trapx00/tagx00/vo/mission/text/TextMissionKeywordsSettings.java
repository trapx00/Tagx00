package trapx00.tagx00.vo.mission.text;

import java.util.List;

public class TextMissionKeywordsSettings extends TextMissionSetting {

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
