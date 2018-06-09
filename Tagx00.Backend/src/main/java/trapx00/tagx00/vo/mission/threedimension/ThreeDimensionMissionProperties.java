package trapx00.tagx00.vo.mission.threedimension;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;
import trapx00.tagx00.vo.mission.video.VideoMissionType;

import java.util.List;

public class ThreeDimensionMissionProperties extends MissionProperties {
    private boolean allowCustomTag;
    private List<String> tags;

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public ThreeDimensionMissionProperties(boolean allowCustomTag, List<String> tags) {
        this.allowCustomTag = allowCustomTag;
        this.tags = tags;
    }

    public ThreeDimensionMissionProperties(MissionType type, boolean allowCustomTag, List<String> tags) {
        super(type);
        this.allowCustomTag = allowCustomTag;
        this.tags = tags;
    }
}
