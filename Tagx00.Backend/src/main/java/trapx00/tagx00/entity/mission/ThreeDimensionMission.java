package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.mission.instance.ThreeDimensionInstance;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "threeDimensionMission")
public class ThreeDimensionMission extends Mission {
    @Column(name = "allowCustomTag")
    private boolean allowCustomTag;
    @Column(name = "allowedTag")
    @ElementCollection(targetClass = String.class)
    private List<String> allowedTags;
    @Column(name = "tokens")
    @ElementCollection(targetClass = String.class)
    private List<String> tokens;
    @Column(name = "threeDimensionMissionType")
    private ThreeDimensionMissionType threeDimensionMissionTypes;
    @OneToMany(mappedBy = "threeDimensionMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ThreeDimensionInstance> threeDimensionInstances;

    public ThreeDimensionMission() {
    }

    public ThreeDimensionMission(String missionId, String title, String description, List<String> topics, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, boolean allowCustomTag, List<String> allowedTags, List<String> tokens, ThreeDimensionMissionType threeDimensionMissionTypes, List<ThreeDimensionInstance> threeDimensionInstances) {
        super(missionId, title, description, topics, MissionType.THREE_DIMENSION, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel);
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.tokens = tokens;
        this.threeDimensionMissionTypes = threeDimensionMissionTypes;
        this.threeDimensionInstances = threeDimensionInstances;
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

    public List<String> getTokens() {
        return tokens;
    }

    public void setTokens(List<String> tokens) {
        this.tokens = tokens;
    }

    public ThreeDimensionMissionType getThreeDimensionMissionTypes() {
        return threeDimensionMissionTypes;
    }

    public void setThreeDimensionMissionTypes(ThreeDimensionMissionType threeDimensionMissionTypes) {
        this.threeDimensionMissionTypes = threeDimensionMissionTypes;
    }

    public List<ThreeDimensionInstance> getThreeDimensionInstances() {
        return threeDimensionInstances;
    }

    public void setThreeDimensionInstances(List<ThreeDimensionInstance> threeDimensionInstances) {
        this.threeDimensionInstances = threeDimensionInstances;
    }

}
