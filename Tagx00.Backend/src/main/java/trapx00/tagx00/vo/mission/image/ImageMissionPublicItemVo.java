package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class ImageMissionPublicItemVo extends MissionPublicItemVo {

    private boolean allowCustomTag;
    public List<ImageMissionType> imageMissionTypes;

    public ImageMissionPublicItemVo() {
    }

    public ImageMissionPublicItemVo(String missionId, String title, String description, List<String> topics, MissionType missionType, Date start, Date end, String coverUrl, int level, int credits, int minimalWorkerLevel, int jobCount, String requesterUsername, boolean allowCustomTag, List<ImageMissionType> imageMissionTypes) {
        super(missionId, title, description, topics, missionType, start, end, coverUrl, level, credits, minimalWorkerLevel, jobCount, requesterUsername);
        this.allowCustomTag = allowCustomTag;
        this.imageMissionTypes = imageMissionTypes;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<ImageMissionType> getImageMissionTypes() {
        return imageMissionTypes;
    }

    public void setImageMissionTypes(List<ImageMissionType> imageMissionTypes) {
        this.imageMissionTypes = imageMissionTypes;
    }
}
