package trapx00.tagx00.vo.mission.text;

import java.util.List;

public class TextMissionClassificationSetting extends TextMissionSetting {

    private List<String> classes;

    public TextMissionClassificationSetting() {
        super(TextMissionType.CLASSIFICATION);
    }

    public TextMissionClassificationSetting(TextMissionType textMissionType, List<String> classes) {
        super(textMissionType);
        this.classes = classes;
    }

    public List<String> getClasses() {
        return classes;
    }

    public void setClasses(List<String> classes) {
        this.classes = classes;
    }
}
