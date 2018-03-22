package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.Entity;
import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.util.Date;
import java.util.List;

@Table(name = "mission")
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

    @JsonSerialize
    @Column(name = "imageUrls")
    private List<String> imageUrls;
    @JsonSerialize
    @Column(name = "imageMissionType")
    private List<ImageMissionType> imageMissionTypes;

    public Mission() {
    }

    public Mission(String title, String description, List<String> topics, boolean allowCustomTag,
                   List<String> allowedTags, MissionType missionType, MissionState missionState,
                   Date start, Date end, String coverUrl, String requesterUsername,
                   List<String> imageUrls, List<ImageMissionType> imageMissionTypes) {
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
        this.imageUrls = imageUrls;
        this.imageMissionTypes = imageMissionTypes;
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

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public List<ImageMissionType> getImageMissionTypes() {
        return imageMissionTypes;
    }

    public void setImageMissionTypes(List<ImageMissionType> imageMissionTypes) {
        this.imageMissionTypes = imageMissionTypes;
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
