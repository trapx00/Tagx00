package trapx00.tagx00.vo.mission.audio;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class AudioMissionProperties  extends MissionProperties {

    private boolean allowCustomTag;
    private List<String> allowedTags;

    public AudioMissionProperties() {
    }

    public AudioMissionProperties(MissionType type, boolean allowCustomTag, List<String> allowedTags) {
        super(type);
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<String> getAllowedTags() {
        return allowedTags;
    }

    public void setAllowedTags(List<String> allowedTags) {
        this.allowedTags = allowedTags;
    }
}
