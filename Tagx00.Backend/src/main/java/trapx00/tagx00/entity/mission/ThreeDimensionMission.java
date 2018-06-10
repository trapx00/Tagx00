package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.mission.favorite.ThreeDimensionFavorite;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class ThreeDimensionMission extends Mission {
    @Column(name = "threeDimensionCustomTag")
    private boolean allowCustomTag;
    @Column(name = "threeDimensionTokens")
    @ElementCollection(targetClass = String.class)
    private List<String> tokens;
    @Column(name = "allowedTag")
    @ElementCollection(targetClass = java.lang.String.class)
    private List<java.lang.String> allowedTags;
    @Column(name = "threeDimensionMissionType")
    private ThreeDimensionMissionType threeDimensionMissionTypes;
    @OneToMany(mappedBy = "threeDimensionMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ThreeDimensionMission> threeDimensionMissions;
    @OneToMany(mappedBy = "audioMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ThreeDimensionFavorite> threeDimensionFavorites;

    public ThreeDimensionMission() {
    }

    public ThreeDimensionMission(java.lang.String missionId, java.lang.String title, java.lang.String description, List<java.lang.String> topics,
                                 MissionType missionType, MissionState missionState,
                                 Date start, Date end, java.lang.String coverUrl, java.lang.String requesterUsername,
                                 int level, int credits, int minimalWorkerLevel, List<java.lang.String> browserUsers,
                                 boolean allowCustomTag, List<String> tokens,
                                 List<java.lang.String> allowedTags,
                                 List<ThreeDimensionMission> threeDimensionMissions, List<ThreeDimensionFavorite> threeDimensionFavorites) {
        super(missionId, title, description, topics, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel, browserUsers);
        this.allowCustomTag = allowCustomTag;
        this.tokens = tokens;
        this.allowedTags = allowedTags;
        this.threeDimensionMissionTypes =ThreeDimensionMissionType.WHOLE;
        this.threeDimensionMissions = threeDimensionMissions;
        this.threeDimensionFavorites = threeDimensionFavorites;
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

    public List<ThreeDimensionMission> getThreeDimensionMissions() {
        return threeDimensionMissions;
    }

    public void setThreeDimensionMissions(List<ThreeDimensionMission> threeDimensionMissions) {
        this.threeDimensionMissions = threeDimensionMissions;
    }

    public List<ThreeDimensionFavorite> getThreeDimensionFavorites() {
        return threeDimensionFavorites;
    }

    public void setThreeDimensionFavorites(List<ThreeDimensionFavorite> threeDimensionFavorites) {
        this.threeDimensionFavorites = threeDimensionFavorites;
    }
}
