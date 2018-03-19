package trapx00.tagx00.vo.mission.requester;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

import java.util.List;

public class MissionRequesterQueryDetailVo extends MissionRequesterQueryItemVo {
    private List<String> imageUrls;

    public MissionRequesterQueryDetailVo(String title, String description, MissionVo mission, MissionState missionState, String coverUrl, List<String> imageUrls) {
        super(title, description, mission, missionState, coverUrl);
        this.imageUrls = imageUrls;
    }
}
