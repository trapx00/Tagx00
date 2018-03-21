package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class ImageMissionDetailVo extends MissionPublicItemVo {

    private List<String> imageUrls;

    public ImageMissionDetailVo(int missionId, String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, Date start, Date end, String coverUrl, String requesterUsername, List<String> imageUrls, List<ImageMissionType> imageMissionTypes) {
        super(missionId, title, description, topics, allowCustomTag, allowedTags, missionType, start, end, coverUrl, requesterUsername);
        this.imageUrls = imageUrls;
        this.imageMissionTypes = imageMissionTypes;
    }

    private List<ImageMissionType> imageMissionTypes;
}
