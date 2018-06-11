package trapx00.tagx00.vo.mission.audio;


import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.Date;

public class AudioInstanceVo extends InstanceVo {
    public AudioInstanceVo() {
    }

    public AudioInstanceVo(String instanceId, double expRatio, double exp, int credits, String comment, String workerUsername, MissionInstanceState missionInstanceState, String missionId, Date acceptDate, Date submitDate, boolean isSubmitted, int completedJobsCount) {
        super(instanceId, expRatio, exp, credits, comment, workerUsername, missionInstanceState, missionId, acceptDate, submitDate, isSubmitted, completedJobsCount);
    }
}
