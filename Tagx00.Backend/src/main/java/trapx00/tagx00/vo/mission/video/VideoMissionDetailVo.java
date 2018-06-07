package trapx00.tagx00.vo.mission.video;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;


import java.util.List;

public class VideoMissionDetailVo extends MissionDetailVo {
    private List<String> videoUrls;
    private List<VideoMissionType> videoMissionTypes;


    public VideoMissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState, String requesterUsername,
                                MissionType missionType,
                                List<String> videoUrls, List<VideoMissionType> videoMissionTypes) {
        super(publicItem, missionState, requesterUsername, missionType);
        this.videoUrls = videoUrls;
        this.videoMissionTypes = videoMissionTypes;
    }
}
