package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class TextMissionProperties extends MissionProperties {
    private List<TextMissionType> textMissionTypes;

    public TextMissionProperties() {
    }

    public TextMissionProperties(List<TextMissionType> textMissionTypes) {
        this.textMissionTypes = textMissionTypes;
    }

    public TextMissionProperties(MissionType type, List<TextMissionType> textMissionTypes) {
        super(type);
        this.textMissionTypes = textMissionTypes;
    }

    public List<TextMissionType> getImageMissionTypes() {
        return textMissionTypes;
    }

    public void setImageMissionTypes(List<TextMissionType> textMissionTypes) {
        this.textMissionTypes = textMissionTypes;
    }
}
