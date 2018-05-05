package trapx00.tagx00.entity.mission.favorite;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "favoriteId")
    private int favoriteId;

    @Column(name = "workerUsername")
    private String workerUsername;

    @Column(name = "MissionType")
    private MissionType missionType;

    @Column(name = "acceptDate")
    private Date acceptDate;

    @Column(name = "missionId")
    private int missionId;
}
