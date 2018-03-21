package trapx00.tagx00.vo.mission.worker;

import trapx00.tagx00.vo.mission.missiontype.MissionProperties;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

public class MissionWorkerQueryItemVo {
    private String title;
    private String description;
    private MissionProperties mission;
    private int missionId;
    private MissionInstanceState state;
    private String coverUrl; //封面url


    public MissionWorkerQueryItemVo(String title, String description, MissionProperties mission, MissionInstanceState state, String coverUrl, int missionId) {
        this.title = title;
        this.description = description;
        this.mission = mission;
        this.state = state;
        this.coverUrl = coverUrl;
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

    public MissionProperties getMission() {
        return mission;
    }

    public void setMission(MissionProperties mission) {
        this.mission = mission;
    }

    public MissionInstanceState getState() {
        return state;
    }

    public void setState(MissionInstanceState state) {
        this.state = state;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }


}
