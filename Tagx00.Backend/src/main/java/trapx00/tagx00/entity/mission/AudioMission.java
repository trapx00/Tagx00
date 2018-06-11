package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.mission.instance.AudioInstance;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class AudioMission extends Mission {
    @Column(name = "allowCustomTag")
    private boolean allowCustomTag;
    @Column(name = "audioUrls")
    @ElementCollection(targetClass = String.class)
    private List<String> audioUrls;
    @Column(name = "allowedTag")
    @ElementCollection(targetClass = String.class)
    private List<String> allowedTags;
    @Column(name = "audioMissionType")
    @ElementCollection(targetClass = AudioMissionType.class)
    private List<AudioMissionType> audioMissionTypes;
    @OneToMany(mappedBy = "audioMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<AudioInstance> audioInstances;

    public AudioMission() {
    }

    public AudioMission(String missionId, String title, String description, List<String> topics, MissionType missionType, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, boolean allowCustomTag, List<String> audioUrls, List<String> allowedTags, List<AudioMissionType> audioMissionTypes, List<AudioInstance> audioInstances) {
        super(missionId, title, description, topics, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel);
        this.allowCustomTag = allowCustomTag;
        this.audioUrls = audioUrls;
        this.allowedTags = allowedTags;
        this.audioMissionTypes = audioMissionTypes;
        this.audioInstances = audioInstances;
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

    public List<String> getAudioUrls() {
        return audioUrls;
    }

    public void setAudioUrls(List<String> audioUrls) {
        this.audioUrls = audioUrls;
    }

    public List<AudioMissionType> getAudioMissionTypes() {
        return audioMissionTypes;
    }

    public void setAudioMissionTypes(List<AudioMissionType> audioMissionTypes) {
        this.audioMissionTypes = audioMissionTypes;
    }

    public List<AudioInstance> getAudioInstances() {
        return audioInstances;
    }

    public void setAudioInstances(List<AudioInstance> audioInstances) {
        this.audioInstances = audioInstances;
    }
}
