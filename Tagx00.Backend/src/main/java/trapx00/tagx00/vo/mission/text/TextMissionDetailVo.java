package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.entity.mission.textmissionsettings.TextMissionSetting;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class TextMissionDetailVo extends MissionDetailVo {


    {
        System.out.println(123);
    }

    private List<String> tokens;

    private List<TextMissionSetting> settings;

    public TextMissionDetailVo() {
    }

    public TextMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, String requesterUsername, MissionType missionType, List<String> tokens, List<TextMissionSetting> settings) {
        super(publicItem, missionState, requesterUsername, missionType);
        this.tokens = tokens;
        this.settings = settings;
    }

    public List<String> getTokens() {
        return tokens;
    }

    public void setTokens(List<String> tokens) {
        this.tokens = tokens;
    }

    public List<TextMissionSetting> getSettings() {
        return settings;
    }

    public void setSettings(List<TextMissionSetting> settings) {
        this.settings = settings;
    }

}
