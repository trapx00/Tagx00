package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.entity.annotation.GeneratedValue;
import trapx00.tagx00.entity.annotation.GenerationType;
import trapx00.tagx00.entity.annotation.Id;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

public class InstanceVo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "instanceId")
    private int instanceId;

    @Column(name = "workerUsername")
    private String workerUsername;

    @Column(name = "missionInstanceState")
    private MissionInstanceState missionInstanceState;

    @Column(name = "missionId")
    private int missionId;

    @Column(name = "acceptDate")
    private Date acceptDate;

    @Column(name = "submitDate")
    private Date submitDate;


    @Column(name = "isSubmitted")
    private boolean isSubmitted;

    private int completedJobsCount;

}
