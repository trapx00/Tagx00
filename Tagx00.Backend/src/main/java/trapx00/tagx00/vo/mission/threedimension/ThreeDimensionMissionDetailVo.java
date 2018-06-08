package trapx00.tagx00.vo.mission.threedimension;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionModelUrl;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class ThreeDimensionMissionDetailVo extends MissionDetailVo {

    private List<ThreeDimensionModelUrl> modelUrls;

    public List<ThreeDimensionModelUrl> getModelUrls() {
        return modelUrls;
    }

    public void setModelUrls(List<ThreeDimensionModelUrl> modelUrls) {
        this.modelUrls = modelUrls;
    }

    public ThreeDimensionMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, String requesterUsername, MissionType missionType, List<ThreeDimensionModelUrl> modelUrls) {
        super(publicItem, missionState, requesterUsername, missionType);
        this.modelUrls = modelUrls;
    }
}
