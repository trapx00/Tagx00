package trapx00.tagx00.vo.mission.audio;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.List;

public class AudioMissionProperties extends MissionProperties {


    public AudioMissionProperties(MissionType type, boolean allowCustomTag, List<String> tags, List<AudioMissionType> audioMissionTypes) {
        super(type);
        this.allowCustomTag = allowCustomTag;
        this.tags = tags;
        this.audioMissionTypes = audioMissionTypes;
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

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<AudioMissionType> getAudioMissionTypes() {
        return audioMissionTypes;
    }

    public void setAudioMissionTypes(List<AudioMissionType> audioMissionTypes) {
        this.audioMissionTypes = audioMissionTypes;
    }

    public AudioMissionProperties() {
        super(MissionType.AUDIO);
    }

    private boolean allowCustomTag;
    private List<String> tags;
    private List<AudioMissionType> audioMissionTypes;

}
