package trapx00.tagx00.vo.mission.threedimension;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class ThreeDimensionMissionDetailVo extends MissionDetailVo {

    private List<String> tokens;

    public List<String> getTokens() {
        return tokens;
    }

    public void setTokens(List<String> tokens) {
        this.tokens = tokens;
    }

    public ThreeDimensionMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, java.lang.String requesterUsername, MissionType missionType, List<String> tokens) {
        super(publicItem, missionState, requesterUsername, missionType);
        this.tokens = tokens;
    }
}
