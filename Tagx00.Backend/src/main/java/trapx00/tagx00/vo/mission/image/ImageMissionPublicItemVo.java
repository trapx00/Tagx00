package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class ImageMissionPublicItemVo extends MissionPublicItemVo {

    private boolean allowCustomTag;
    public List<ImageMissionType> missionTypes;

    public ImageMissionPublicItemVo() {
    }

    public ImageMissionPublicItemVo(String missionId, String title, String description, List<String> topics, MissionType missionType, Date start, Date end, String coverUrl, int level, int credits, int minimalWorkerLevel, int jobCount, String requesterUsername, boolean allowCustomTag, List<ImageMissionType> missionTypes) {
        super(missionId, title, description, topics, missionType, start, end, coverUrl, level, credits, minimalWorkerLevel, jobCount, requesterUsername);
        this.allowCustomTag = allowCustomTag;
        this.missionTypes = missionTypes;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<ImageMissionType> getMissionTypes() {
        return missionTypes;
    }

    public void setMissionTypes(List<ImageMissionType> missionTypes) {
        this.missionTypes = missionTypes;
    }
}
