package trapx00.tagx00.vo.mission.requester;

import trapx00.tagx00.vo.mission.missiontype.MissionVo;

import java.util.Date;
import java.util.List;

public class MissionCreateVo {
    private String title;
    private String description;
    private List<String> topics;
    private boolean allowCustomTag;
    private List<String> allowedTags;
    private MissionVo mission;
    private Date start;
    private Date end;
    private String username;

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

    public MissionVo getMission() {
        return mission;
    }

    public void setMission(MissionVo mission) {
        this.mission = mission;
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
