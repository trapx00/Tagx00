package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.Date;
import java.util.List;

public class Mission extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "missionId")
    private int missionId;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @ElementCollection(targetClass = String.class)
    @Column(name = "topics")
    private List<String> topics;
    @Column(name = "allowCustomTag")
    private boolean allowCustomTag;
    @ElementCollection(targetClass = String.class)
    @Column(name = "allowedTags")
    private List<String> allowedTags;
    @EnumTranslate(targetClass = MissionType.class)
    @Column(name = "missionType")
    private MissionType missionType;
    @EnumTranslate(targetClass = MissionState.class)
    @Column(name = "missionState")
    private MissionState missionState;
    @JsonSerialize
    @Column(name = "start")
    private Date start;
    @JsonSerialize
    @Column(name = "end")
    private Date end;
    @Column(name = "coverUrl")
    private String coverUrl;
    @Column(name = "requesterUsername")
    private String requesterUsername;
    @Column(name = "level")
    private int level;
    @Column(name = "credits")
    private int credits;
    @Column(name = "minimalWorkerLevel")
    private int minimalWorkerLevel;

    public Mission() {
    }

    public Mission(int missionId, String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, MissionState missionState, Date start, Date end, String coverUrl, String requesterUsername, int level, int credits, int minimalWorkerLevel) {
        this.missionId = missionId;
        this.title = title;
        this.description = description;
        this.topics = topics;
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.missionType = missionType;
        this.missionState = missionState;
        this.start = start;
        this.end = end;
        this.coverUrl = coverUrl;
        this.requesterUsername = requesterUsername;
        this.level = level;
        this.credits = credits;
        this.minimalWorkerLevel = minimalWorkerLevel;
    }

    public MissionState getMissionState() {
        return missionState;
    }

    public void setMissionState(MissionState missionState) {
        this.missionState = missionState;
    }

    public int getMissionId() {
        return missionId;
    }

    public void setMissionId(int missionId) {
        this.missionId = missionId;
    }

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

    public MissionType getMissionType() {
        return missionType;
    }

    public void setMissionType(MissionType missionType) {
        this.missionType = missionType;
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

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getRequesterUsername() {
        return requesterUsername;
    }

    public void setRequesterUsername(String requesterUsername) {
        this.requesterUsername = requesterUsername;
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
