package trapx00.tagx00.vo.mission.forpublic;

import trapx00.tagx00.vo.mission.missiontype.MissionVo;

import java.util.Date;
import java.util.List;

public class MissionPublicItemVo {
    private String title;
    private List<String> topics;
    private MissionVo mission;
    private Date start;
    private Date end;

    public MissionPublicItemVo(String title, List<String> topics, MissionVo mission, Date start, Date end) {
        this.title = title;
        this.topics = topics;
        this.mission = mission;
        this.start = start;
        this.end = end;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
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
}
