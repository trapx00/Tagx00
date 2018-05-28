package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class TextMissionProperties extends MissionProperties {

    private List<TextMissionSetting> settings;
    private List<TextMissionType> textMissionTypes;

    public List<TextMissionType> getTextMissionTypes() {
        return textMissionTypes;
    }

    public void setTextMissionTypes(List<TextMissionType> textMissionTypes) {
        this.textMissionTypes = textMissionTypes;
    }

    public TextMissionProperties() {
    }

    public TextMissionProperties(List<TextMissionSetting> settings) {

        this.settings = settings;
        for (TextMissionSetting a : settings) {
            textMissionTypes.add(a.getTextMissionType());
        }
    }

    public TextMissionProperties(MissionType type, List<TextMissionSetting> settings) {
        super(type);
        this.settings = settings;
    }

    public List<TextMissionSetting> getSettings() {
        return settings;
    }

    public void setSettings(List<TextMissionSetting> settings) {
        this.settings = settings;
    }
}
