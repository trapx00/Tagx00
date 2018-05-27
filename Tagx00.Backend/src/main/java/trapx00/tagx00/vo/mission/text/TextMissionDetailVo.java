package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class TextMissionDetailVo extends MissionDetailVo {

    private List<String> tokens;

    private List<TextMissionSetting> textMissionTypes;

    public TextMissionDetailVo(List<String> tokens, List<TextMissionSetting> textMissionTypes) {
        this.tokens = tokens;
        this.textMissionTypes = textMissionTypes;
    }

    public TextMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, String requesterUsername, List<String> tokens, List<TextMissionSetting> textMissionTypes) {
        super(publicItem, missionState, requesterUsername);
        this.tokens = tokens;
        this.textMissionTypes = textMissionTypes;
    }

    public List<String> getTokens() {
        return tokens;
    }

    public void setTokens(List<String> tokens) {
        this.tokens = tokens;
    }

    public List<TextMissionSetting> getTextMissionTypes() {
        return textMissionTypes;
    }

    public void setTextMissionTypes(List<TextMissionSetting> textMissionTypes) {
        this.textMissionTypes = textMissionTypes;
    }

}
