package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.util.Date;
import java.util.List;

public class ImageMissionPublicItemVo extends MissionPublicItemVo {
    public List<ImageMissionType> missionTypes;

    public ImageMissionPublicItemVo(int missionId, String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, Date start, Date end, String coverUrl, String requesterUsername) {
        super(missionId, title, description, topics, allowCustomTag, allowedTags, MissionType.IMAGE, start, end, coverUrl, requesterUsername);
    }
}
