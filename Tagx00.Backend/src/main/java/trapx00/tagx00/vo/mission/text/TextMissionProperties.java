package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class TextMissionProperties extends MissionProperties {

    private List<TextMissionSetting> settings;

    public TextMissionProperties() {
    }

    public TextMissionProperties(List<TextMissionSetting> settings) {
        this.settings = settings;
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
