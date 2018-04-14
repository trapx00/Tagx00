package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.Date;

public class ImageInstanceVo extends InstanceVo {
    public ImageInstanceVo() {
    }

    public ImageInstanceVo(int instanceId, double expRatio, double exp, int credits, String comment, String workerUsername, MissionInstanceState missionInstanceState, int missionId, Date acceptDate, Date submitDate, boolean isSubmitted, int completedJobsCount) {
        super(instanceId, expRatio, exp, credits, comment, workerUsername, missionInstanceState, missionId, acceptDate, submitDate, isSubmitted, completedJobsCount);
    }

    public ImageInstanceVo(double expRatio, double exp, int credits, String comment, String workerUsername, MissionInstanceState missionInstanceState, int missionId, Date acceptDate, Date submitDate, boolean isSubmitted, int completedJobsCount) {
        super(expRatio, exp, credits, comment, workerUsername, missionInstanceState, missionId, acceptDate, submitDate, isSubmitted, completedJobsCount);
    }

}
