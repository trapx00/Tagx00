package trapx00.tagx00.vo.mission.requester;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

public class MissionRequesterQueryItemVo {
    private String title;
    private String description;
    private MissionProperties mission;
    private MissionState state;
    private String coverUrl; //封面url

    public MissionRequesterQueryItemVo(String title, String description, MissionProperties mission, MissionState missionState, String coverUrl){
        this.coverUrl=coverUrl;
        this.title=title;
        this.description=description;
        this.mission=mission;
        this.state=missionState;
    }
}
