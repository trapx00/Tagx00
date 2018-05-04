package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;
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

    public ImageMission() {
    }

    public ImageMission(List<String> imageUrls, List<ImageMissionType> imageMissionTypes) {
        this.imageUrls = imageUrls;
        this.imageMissionTypes = imageMissionTypes;
    }

    public ImageMission(String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, ArrayList<User> browserUsers, List<String> imageUrls, List<ImageMissionType> imageMissionTypes) {
        super(title, description, topics, allowCustomTag, allowedTags, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel, browserUsers);
        this.imageUrls = imageUrls;
        this.imageMissionTypes = imageMissionTypes;
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
}
