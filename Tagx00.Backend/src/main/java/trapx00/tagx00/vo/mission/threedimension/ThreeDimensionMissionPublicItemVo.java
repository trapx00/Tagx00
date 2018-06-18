package trapx00.tagx00.vo.mission.threedimension;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class ThreeDimensionMissionPublicItemVo extends MissionPublicItemVo {
    private boolean allowCustomTag;
    private List<String> tags;

    public ThreeDimensionMissionPublicItemVo() {
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public ThreeDimensionMissionPublicItemVo(String missionId, String title, String description, List<String> topics, MissionType missionType, Date start, Date end, String coverUrl, int level, int credits, int minimalWorkerLevel, int jobCount, String requesterUsername, boolean allowCustomTag, List<String> tags) {
        super(missionId, title, description, topics, missionType, start, end, coverUrl, level, credits, minimalWorkerLevel, jobCount, requesterUsername);
        this.allowCustomTag = allowCustomTag;
        this.tags = tags;
    }
}
