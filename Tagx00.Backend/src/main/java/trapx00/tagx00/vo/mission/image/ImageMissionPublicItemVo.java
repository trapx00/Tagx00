package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class ImageMissionPublicItemVo extends MissionPublicItemVo {
    private List<String> topics;
    private boolean allowCustomTag;
    private List<String> allowedTags;
    public List<ImageMissionType> missionTypes;

    public ImageMissionPublicItemVo() {
    }

    public ImageMissionPublicItemVo(String missionId, String title, String description,
                                    MissionType missionType, Date start, Date end, String coverUrl,
                                    int level, int credits, int minimalWorkerLevel, int jobCount, String requesterUsername,
                                    List<String> topics, boolean allowCustomTag, List<String> allowedTags, List<ImageMissionType> missionTypes) {
        super(missionId, title, description, missionType, start, end, coverUrl, level, credits, minimalWorkerLevel, jobCount, requesterUsername);
        this.topics = topics;
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.missionTypes = missionTypes;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }

    public boolean isAllowCustomTag() {
        return allowCustomTag;
    }

    public void setAllowCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public List<String> getAllowedTags() {
        return allowedTags;
    }

    public void setAllowedTags(List<String> allowedTags) {
        this.allowedTags = allowedTags;
    }

    public List<ImageMissionType> getMissionTypes() {
        return missionTypes;
    }

    public void setMissionTypes(List<ImageMissionType> missionTypes) {
        this.missionTypes = missionTypes;
    }
}
