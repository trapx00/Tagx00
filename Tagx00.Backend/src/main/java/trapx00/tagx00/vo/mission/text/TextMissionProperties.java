package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class TextMissionProperties extends MissionProperties {
    private TextMissionSetting[] settings;

    public TextMissionProperties() {
    }

    public TextMissionProperties(TextMissionSetting[] settings) {
        this.settings = settings;
    }

    public TextMissionProperties(MissionType type, TextMissionSetting[] settings) {
        super(type);
        this.settings = settings;
    }

    public TextMissionSetting[] getSettings() {
        return settings;
    }

    public void setSettings(TextMissionSetting[] settings) {
        this.settings = settings;
    }
}
