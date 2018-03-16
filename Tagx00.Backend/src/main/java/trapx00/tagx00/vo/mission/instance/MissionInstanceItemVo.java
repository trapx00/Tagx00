package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;

public class MissionInstanceItemVo {

    private int missionId;
    private String workerUsername;
    private MissionInstanceState state;
    private Date acceptDate;

    public MissionInstanceItemVo(int missionId, String workerUsername, MissionInstanceState state, Date acceptDate, Date submitDate, int completedCount, int totalCount) {
        this.missionId = missionId;
        this.workerUsername = workerUsername;
        this.state = state;
        this.acceptDate = acceptDate;
        this.submitDate = submitDate;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
    }

    private Date submitDate;
    private int completedCount;
    private int totalCount;


}
