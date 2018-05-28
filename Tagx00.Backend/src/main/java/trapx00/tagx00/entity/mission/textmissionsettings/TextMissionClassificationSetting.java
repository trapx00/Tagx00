package trapx00.tagx00.entity.mission.textmissionsettings;

import trapx00.tagx00.vo.mission.text.TextMissionType;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import java.util.List;

@Embeddable
public class TextMissionClassificationSetting extends TextMissionSetting {

    @Column(name = "classes")
    @ElementCollection(targetClass = String.class)
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
