package trapx00.tagx00.entity;

import trapx00.tagx00.entity.mission.Mission;
import trapx00.tagx00.entity.mission.favorite.ThreeDimensionFavorite;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionModelUrl;
import trapx00.tagx00.vo.mission.audio.AudioMissionType;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class ThreeDimensionMission extends Mission {
    @Column(name = "threeDimensionCustomTag")
    private boolean allowCustomTag;
    @Column(name = "threeDimensionModelUrl")
    @ElementCollection(targetClass = ThreeDimensionModelUrl.class)
    private List<ThreeDimensionModelUrl> threeDimensionModelUrls;
    @Column(name = "allowedTag")
    @ElementCollection(targetClass = String.class)
    private List<String> allowedTags;
    @Column(name = "threeDimensionMissionType")
    @ElementCollection(targetClass = AudioMissionType.class)
    private List<ThreeDimensionMissionType> threeDimensionMissionTypes;
    @OneToMany(mappedBy = "threeDimensionMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ThreeDimensionMission> threeDimensionMissions;
    @OneToMany(mappedBy = "audioMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ThreeDimensionFavorite> threeDimensionFavorites;

    public ThreeDimensionMission() {
    }

    public ThreeDimensionMission(String missionId, String title, String description, List<String> topics, MissionType missionType, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, List<String> browserUsers, boolean allowCustomTag, List<ThreeDimensionModelUrl> threeDimensionModelUrls, List<String> allowedTags, List<ThreeDimensionMissionType> threeDimensionMissionTypes, List<ThreeDimensionMission> threeDimensionMissions, List<ThreeDimensionFavorite> threeDimensionFavorites) {
        super(missionId, title, description, topics, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel, browserUsers);
        this.allowCustomTag = allowCustomTag;
        this.threeDimensionModelUrls = threeDimensionModelUrls;
        this.allowedTags = allowedTags;
        this.threeDimensionMissionTypes = threeDimensionMissionTypes;
        this.threeDimensionMissions = threeDimensionMissions;
        this.threeDimensionFavorites = threeDimensionFavorites;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<ThreeDimensionModelUrl> getThreeDimensionModelUrls() {
        return threeDimensionModelUrls;
    }

    public void setThreeDimensionModelUrls(List<ThreeDimensionModelUrl> threeDimensionModelUrls) {
        this.threeDimensionModelUrls = threeDimensionModelUrls;
    }

    public List<String> getAllowedTags() {
        return allowedTags;
    }

    public void setAllowedTags(List<String> allowedTags) {
        this.allowedTags = allowedTags;
    }

    public List<ThreeDimensionMissionType> getThreeDimensionMissionTypes() {
        return threeDimensionMissionTypes;
    }

    public void setThreeDimensionMissionTypes(List<ThreeDimensionMissionType> threeDimensionMissionTypes) {
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
