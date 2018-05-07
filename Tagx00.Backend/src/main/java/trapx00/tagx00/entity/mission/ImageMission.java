package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.mission.favorite.ImageFavorite;
import trapx00.tagx00.entity.mission.instance.ImageInstance;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "imageMission")
public class ImageMission extends Mission {
    @Column(name = "imageUrls")
    @ElementCollection(targetClass = String.class)
    private List<String> imageUrls;
    @Column(name = "imageMissionType")
    @ElementCollection(targetClass = ImageMissionType.class)
    private List<ImageMissionType> imageMissionTypes;
    @OneToMany(mappedBy = "imageMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ImageInstance> imageInstances;
    @OneToMany(mappedBy = "imageMission", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ImageFavorite> imageFavorites;

    public ImageMission() {
    }

    public ImageMission(String missionId, String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, ArrayList<String> browserUsers, List<String> imageUrls, List<ImageMissionType> imageMissionTypes, List<ImageInstance> imageInstances, List<ImageFavorite> imageFavorites) {
        super(missionId, title, description, topics, allowCustomTag, allowedTags, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel, browserUsers);
        this.imageUrls = imageUrls;
        this.imageMissionTypes = imageMissionTypes;
        this.imageInstances = imageInstances;
        this.imageFavorites = imageFavorites;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
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
