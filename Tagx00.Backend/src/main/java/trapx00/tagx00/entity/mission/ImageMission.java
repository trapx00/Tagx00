package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.mission.favorite.ImageFavorite;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class ImageMission extends Mission {
    @Column(name = "allowCustomTag")
    private boolean allowCustomTag;
    @Column(name = "allowedTag")
    @ElementCollection(targetClass = String.class)
    private List<String> allowedTags;
    @Column(name = "missionAssets")
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<MissionAsset> missionAssets;
    @Column(name = "imageMissionType")
    @ElementCollection(targetClass = ImageMissionType.class)
    private List<ImageMissionType> imageMissionTypes;
    @OneToMany(mappedBy = "imageMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ImageInstance> imageInstances;
    @OneToMany(mappedBy = "imageMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ImageFavorite> imageFavorites;

    public ImageMission() {
    }


    public ImageMission(String missionId, String title, String description, List<String> topics, MissionType missionType, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, List<String> browserUsers, boolean allowCustomTag, List<String> allowedTags, List<MissionAsset> missionAssets, List<ImageMissionType> imageMissionTypes, List<ImageInstance> imageInstances, List<ImageFavorite> imageFavorites) {
        super(missionId, title, description, topics, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel, browserUsers);
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.missionAssets = missionAssets;
        this.imageMissionTypes = imageMissionTypes;
        this.imageInstances = imageInstances;
        this.imageFavorites = imageFavorites;
    }

    public List<String> getAllowedTags() {
        return allowedTags;
    }

    public void setAllowedTags(List<String> allowedTags) {
        this.allowedTags = allowedTags;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<MissionAsset> getMissionAssets() {
        return missionAssets;
    }

    public void setMissionAssets(List<MissionAsset> missionAssets) {
        this.missionAssets = missionAssets;
    }

    public List<ImageMissionType> getImageMissionTypes() {
        return imageMissionTypes;
    }

    public void setImageMissionTypes(List<ImageMissionType> imageMissionTypes) {
        this.imageMissionTypes = imageMissionTypes;
    }

    public List<ImageInstance> getImageInstances() {
        return imageInstances;
    }

    public void setImageInstances(List<ImageInstance> imageInstances) {
        this.imageInstances = imageInstances;
    }

    public List<ImageFavorite> getImageFavorites() {
        return imageFavorites;
    }

    public void setImageFavorites(List<ImageFavorite> imageFavorites) {
        this.imageFavorites = imageFavorites;
    }
}
