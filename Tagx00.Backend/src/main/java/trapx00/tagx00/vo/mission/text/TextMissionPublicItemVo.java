package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class TextMissionPublicItemVo extends MissionPublicItemVo {

    public List<TextMissionSetting> textMissionSettings;

    public TextMissionPublicItemVo() {
    }

    public TextMissionPublicItemVo(String missionId, String title, String description, List<String> topics, MissionType missionType, Date start, Date end, String coverUrl, int level, int credits, int minimalWorkerLevel, int jobCount, String requesterUsername, List<TextMissionSetting> textMissionSettings) {
        super(missionId, title, description, topics, missionType, start, end, coverUrl, level, credits, minimalWorkerLevel, jobCount, requesterUsername);
        this.textMissionSettings = textMissionSettings;
    }

    public List<TextMissionSetting> getTextMissionSettings() {
        return textMissionSettings;
    }

    public void setTextMissionSettings(List<TextMissionSetting> textMissionSettings) {
        this.textMissionSettings = textMissionSettings;
    }
}

