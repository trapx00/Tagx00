package trapx00.tagx00.vo.mission.video;

import trapx00.tagx00.vo.mission.audio.AudioMissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class VideoMissionProperties extends MissionProperties {
    private boolean allowCustomTag;
    private List<String> tags;
    private List<VideoMissionType> videoMissionTypes;
}
