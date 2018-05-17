package trapx00.tagx00.vo.mission.text;

public class TextMissionClassificationSetting extends TextMissionSetting {

    private String[] classes;

    public TextMissionClassificationSetting() {
        super(TextMissionType.CLASSIFICATION);
    }

    public TextMissionClassificationSetting(String[] classes) {
        super(TextMissionType.CLASSIFICATION);
        this.classes = classes;
    }

    public String[] getClasses() {
        return classes;
    }

    public void setClasses(String[] classes) {
        this.classes = classes;
    }
}
