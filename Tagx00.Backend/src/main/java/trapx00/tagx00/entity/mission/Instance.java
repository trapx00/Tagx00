package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.instance.MissionInstanceState;

import java.util.Date;
import java.util.List;

public class Instance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "workerUsername")
    private String workerUsername;

    @Column(name = "missionInstanceState")
    private MissionInstanceState missionInstanceState;

    @Column(name = "acceptDate")
    private Date acceptDate;

    @Column(name = "submitDate")
    private Date submitDate;

    @ElementCollection(targetClass = Integer.class)
    @Column(name = "imageIds")
    private List<Integer> imageIds;

    @Column(name = "isSubmitted")
    private boolean isSubmitted;
}
