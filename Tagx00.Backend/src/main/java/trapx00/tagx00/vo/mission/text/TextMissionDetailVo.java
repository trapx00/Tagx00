package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.text.TextMissionType;

import java.util.List;

public class TextMissionDetailVo extends MissionDetailVo {

    private List<String> textUrls;

    private List<TextMissionType> textMissionTypes;

    public TextMissionDetailVo() {
    }

    public TextMissionDetailVo(List<String> textUrls, List<TextMissionType> textMissionTypes) {
        this.textUrls = textUrls;
        this.textMissionTypes = textMissionTypes;
    }

    public TextMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, String requesterUsername, List<String> textUrls, List<TextMissionType> textMissionTypes) {
        super(publicItem, missionState, requesterUsername);
        this.textUrls = textUrls;
        this.textMissionTypes = textMissionTypes;
    }

    public List<String> getTextUrls() {
        return textUrls;
    }

    public void setTextUrls(List<String> textUrls) {
        this.textUrls = textUrls;
    }

    public List<TextMissionType> getTextMissionTypes() {
        return textMissionTypes;
    }

    public void setTextMissionTypes(List<TextMissionType> textMissionTypes) {
        this.textMissionTypes = textMissionTypes;
    }
}
