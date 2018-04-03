package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.JsonSerialize;
import trapx00.tagx00.entity.annotation.Table;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.util.Date;
import java.util.List;

@Table(name = "imageMission")
public class ImageMission extends Mission {
    @JsonSerialize
    @Column(name = "imageUrls")
    private List<String> imageUrls;
    @JsonSerialize
    @Column(name = "imageMissionType")
    private List<ImageMissionType> imageMissionTypes;

    public ImageMission() {
    }

    public ImageMission(int missionId, String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel, List<String> imageUrls, List<ImageMissionType> imageMissionTypes) {
        super(missionId, title, description, topics, allowCustomTag, allowedTags, missionType, missionState, start, end, coverUrl, requesterUsername, level, credits, minimalWorkerLevel);
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
