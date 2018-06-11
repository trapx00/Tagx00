package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.mission.instance.ThreeDimensionInstance;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class ThreeDimensionMission extends Mission {
    @Column(name = "allowCustomTag")
    private boolean allowCustomTag;
    @Column(name = "tokens")
    @ElementCollection(targetClass = String.class)
    private List<String> tokens;
    @Column(name = "allowedTag")
    @ElementCollection(targetClass = java.lang.String.class)
    private List<java.lang.String> allowedTags;
    @Column(name = "threeDimensionMissionType")
    private ThreeDimensionMissionType threeDimensionMissionTypes;
    @OneToMany(mappedBy = "threeDimensionMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ThreeDimensionInstance> threeDimensionInstances;

    public ThreeDimensionMission() {
    }

    public ThreeDimensionMission(java.lang.String missionId, java.lang.String title, java.lang.String description, List<java.lang.String> topics,
                                 MissionType missionType, MissionState missionState,
                                 Date start, Date end, java.lang.String coverUrl, java.lang.String requesterUsername,
                                 int level, int credits, int minimalWorkerLevel, List<java.lang.String> browserUsers,
                                 boolean allowCustomTag, List<String> tokens,
                                 List<java.lang.String> allowedTags,
                                 List<ThreeDimensionInstance> threeDimensionInstances) {
        super(missionId, title, description, topics, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel, browserUsers);
        this.allowCustomTag = allowCustomTag;
        this.tokens = tokens;
        this.allowedTags = allowedTags;
        this.threeDimensionMissionTypes = ThreeDimensionMissionType.WHOLE;
        this.threeDimensionInstances = threeDimensionInstances;
    }


    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<String> getTokens() {
        return tokens;
    }

    public void setTokens(List<String> tokens) {
        this.tokens = tokens;
    }

    public List<java.lang.String> getAllowedTags() {
        return allowedTags;
    }

    public void setAllowedTags(List<java.lang.String> allowedTags) {
        this.allowedTags = allowedTags;
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
