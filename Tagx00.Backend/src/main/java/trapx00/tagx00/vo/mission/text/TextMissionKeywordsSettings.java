package trapx00.tagx00.vo.mission.text;

public class TextMissionKeywordsSettings extends TextMissionSetting {

    private String[]keywords;

    public TextMissionKeywordsSettings() {
        super(TextMissionType.KEYWORDS);
    }

    public TextMissionKeywordsSettings(String[] keywords) {
        super(TextMissionType.KEYWORDS);
        this.keywords = keywords;
    }

    public String[] getKeywords() {
        return keywords;
    }

    public void setKeywords(String[] keywords) {
        this.keywords = keywords;
    }
}
