package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class ImageMissionPublicItemVo extends MissionPublicItemVo {
    public List<ImageMissionType> missionTypes;

    public ImageMissionPublicItemVo() {
    }

    public ImageMissionPublicItemVo(int missionId, String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, Date start, Date end, String coverUrl, String requesterUsername) {
        super(missionId, title, description, topics, allowCustomTag, allowedTags, missionType, start, end, coverUrl, requesterUsername);
    }

    public List<ImageMissionType> getMissionTypes() {
        return missionTypes;
    }

    public void setMissionTypes(List<ImageMissionType> missionTypes) {
        this.missionTypes = missionTypes;
    }
}
