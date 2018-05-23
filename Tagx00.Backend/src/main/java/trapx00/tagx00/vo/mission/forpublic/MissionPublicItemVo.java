package trapx00.tagx00.vo.mission.forpublic;

import trapx00.tagx00.publicdatas.mission.MissionType;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class MissionPublicItemVo implements Serializable {
    private String missionId;
    private String title;
    private String description;
    private List<String> topics;
    private MissionType missionType;
    private Date start;
    private Date end;
    private String coverUrl;
    private int level;
    private int credits;
    private int minimalWorkerLevel;
    private int jobCount;
    private String requesterUsername;

    public MissionPublicItemVo() {
    }

    public String getMissionId() {
        return missionId;
    }

    public void setMissionId(String missionId) {
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

    public int getJobCount() {
        return jobCount;
    }

    public void setJobCount(int jobCount) {
        this.jobCount = jobCount;
    }

    public String getRequesterUsername() {
        return requesterUsername;
    }

    public void setRequesterUsername(String requesterUsername) {
        this.requesterUsername = requesterUsername;
    }

    public MissionPublicItemVo(String missionId, String title, String description, List<String> topics, MissionType missionType, Date start, Date end, String coverUrl, int level, int credits, int minimalWorkerLevel, int jobCount, String requesterUsername) {
        this.missionId = missionId;
        this.title = title;
        this.description = description;
        this.topics = topics;
        this.missionType = missionType;
        this.start = start;
        this.end = end;
        this.coverUrl = coverUrl;
        this.level = level;
        this.credits = credits;
        this.minimalWorkerLevel = minimalWorkerLevel;
        this.jobCount = jobCount;
        this.requesterUsername = requesterUsername;
    }
}