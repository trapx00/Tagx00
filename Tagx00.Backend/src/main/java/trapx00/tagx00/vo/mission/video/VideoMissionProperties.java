package trapx00.tagx00.vo.mission.video;


import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class VideoMissionProperties extends MissionProperties {

    private boolean allowCustomTag;

    public VideoMissionProperties() {
    }

    public VideoMissionProperties(MissionType type, boolean allowCustomTag, List<String> tags, List<VideoMissionType> videoMissionTypes) {
        super(type);
        this.allowCustomTag = allowCustomTag;
        this.tags = tags;
        this.videoMissionTypes = videoMissionTypes;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> allowedTags) {
        this.tags = allowedTags;
    }

    public List<VideoMissionType> getVideoMissionTypes() {
        return videoMissionTypes;
    }

    public void setVideoMissionTypes(List<VideoMissionType> videoMissionTypes) {
        this.videoMissionTypes = videoMissionTypes;
    }

    private List<String> tags;
    private List<VideoMissionType> videoMissionTypes;

}
