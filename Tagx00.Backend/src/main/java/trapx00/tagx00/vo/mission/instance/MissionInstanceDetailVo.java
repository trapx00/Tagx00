package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.missiontype.MissionVo;

import java.util.Date;

public class MissionInstanceDetailVo extends MissionInstanceItemVo {
    // all works
    private boolean allowCustomTag;
    private MissionVo mission;


    public MissionInstanceDetailVo(int id, int missionId, String workerUsername, MissionInstanceState state, Date acceptDate, Date submitDate, int completedCount, int totalCount, boolean allowCustomTag, MissionVo mission) {
        super(id,missionId, workerUsername, state, acceptDate, submitDate, completedCount, totalCount);
        this.allowCustomTag = allowCustomTag;
        this.mission = mission;
    }
}
