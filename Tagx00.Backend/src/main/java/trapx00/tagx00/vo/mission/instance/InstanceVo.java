package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.GeneratedValue;
import trapx00.tagx00.entity.annotation.GenerationType;
import trapx00.tagx00.entity.annotation.Id;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

public class InstanceVo {

    private int instanceId;


    private String workerUsername;


    private MissionInstanceState missionInstanceState;


    private int missionId;


    private Date acceptDate;


    private Date submitDate;


    private boolean isSubmitted;

    private int completedJobsCount;

}
