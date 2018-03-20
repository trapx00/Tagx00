package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.Date;
import java.util.List;

@Table(name = "mission")
public class Mission extends Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;
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
    @Column(name = "missionType")
    private MissionType missionType;

    public MissionState getMissionState() {
        return missionState;
    }

    public void setMissionState(MissionState missionState) {
        this.missionState = missionState;
    }

    @Column(name = "missionType")
    private MissionState missionState;
    @Column(name = "start")
    private Date start;
    @Column(name = "end")
    private Date end;
    @ElementCollection(targetClass = String.class)
    @Column(name = "urls")
    private List<String> urls;
    @Column(name = "coverUrl")
    private String coverUrl;
    @Column(name = "requesterUsername")
    private String requesterUsername;

    public  Mission(String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, Date start, Date end, List<String> urls, String coverUrl, String requesterUsername) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.topics = topics;
        this.allowCustomTag = allowCustomTag;
        this.allowedTags = allowedTags;
        this.missionType = missionType;
        this.start = start;
        this.end = end;
        this.urls = urls;
        this.coverUrl = coverUrl;
        this.requesterUsername = requesterUsername;
        this.missionState=MissionState.PENDING;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
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
}
