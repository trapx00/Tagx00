package trapx00.tagx00.vo.mission.image;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.Date;

public class ImageInstanceVo extends InstanceVo {
    public ImageInstanceVo(int instanceId, String workerUsername, MissionInstanceState missionInstanceState, int missionId, Date acceptDate, Date submitDate, boolean isSubmitted, int completedJobsCount) {
        super(instanceId, workerUsername, missionInstanceState, missionId, acceptDate, submitDate, isSubmitted, completedJobsCount);
    }
}
