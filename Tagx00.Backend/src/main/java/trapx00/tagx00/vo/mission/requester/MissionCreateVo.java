package trapx00.tagx00.vo.mission.requester;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.image.ImageMissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionProperties;

import java.util.Date;
import java.util.List;

public class MissionCreateVo {
    private String title;
    private String description;
    private List<String> topics;
    private boolean allowCustomTag;
    private List<String> allowedTags;
    private MissionProperties properties;
    private Date start;
    private Date end;
    private String coverUrls;

    public String getCoverUrls() {
        return coverUrls;
    }

    public void setCoverUrls(String coverUrls) {
        this.coverUrls = coverUrls;
    }

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }

    private List<String> urls;

    public List<ImageMissionType> getImageMissionType() {
        return imageMissionType;
    }

    public void setImageMissionType(List<ImageMissionType> imageMissionType) {
        this.imageMissionType = imageMissionType;
    }

    private List<ImageMissionType> imageMissionType;



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

    public boolean getCustomTag(){
        return allowCustomTag;
    }

    public void setCustomTag(boolean allowCustomTag){
        this.allowCustomTag=allowCustomTag;
    }

}
