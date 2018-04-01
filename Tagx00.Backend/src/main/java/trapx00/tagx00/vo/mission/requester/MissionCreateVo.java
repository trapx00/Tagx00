package trapx00.tagx00.vo.mission.requester;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class MissionCreateVo implements Serializable {
    private String title;
    private String description;
    private List<String> topics;
    private boolean allowCustomTag;
    private List<String> allowedTags;
    private MissionProperties properties;
    private Date start;
    private Date end;
    private int level;
    private int credits;
    private int minimalWorkerLevel;

    public MissionCreateVo() {
    }

    public MissionCreateVo(String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionProperties properties, Date start, Date end, int level, int credits, int minimalWorkerLevel, MissionType missionType) {
        this.title = title;
        this.description = description;
        this.topics = topics;
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.properties = properties;
        this.start = start;
        this.end = end;
        this.level = level;
        this.credits = credits;
        this.minimalWorkerLevel = minimalWorkerLevel;
        this.missionType = missionType;
    }

    public MissionType getMissionType() {
        return missionType;
    }

    public void setMissionType(MissionType missionType) {
        this.missionType = missionType;
    }

    private MissionType missionType;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public MissionProperties getProperties() {
        return properties;
    }

    public void setProperties(MissionProperties properties) {
        this.properties = properties;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public boolean getCustomTag() {
        return allowCustomTag;
    }

    public void setCustomTag(boolean allowCustomTag) {
        this.allowCustomTag = allowCustomTag;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public int getMinimalWorkerLevel() {
        return minimalWorkerLevel;
    }

    public void setMinimalWorkerLevel(int minimalWorkerLevel) {
        this.minimalWorkerLevel = minimalWorkerLevel;
    }
}
