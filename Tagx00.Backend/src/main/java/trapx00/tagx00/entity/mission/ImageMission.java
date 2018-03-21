package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.ElementCollection;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.util.Date;
import java.util.List;

public class ImageMission  extends Mission {

    @ElementCollection(targetClass = String.class)
    @Column(name = "imageUrls")
    private List<String> imageUrls;
    @Column(name="imageMissionType")
    private List<ImageMissionType> imageMissionTypes;

    public ImageMission(String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, Date start, Date end, String coverUrl, String requesterUsername) {
        super(title, description, topics, allowCustomTag, allowedTags, missionType, start, end, coverUrl, requesterUsername);
    }
}
