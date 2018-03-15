package trapx00.tagx00.entity.mission;

import trapx00.tagx00.entity.annotation.*;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.Date;
import java.util.List;

public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @ElementCollection(targetClass = String.class)
    @Column(name = "topics")
    private List<String> topics;
    @Column(name = "allowCustomTag")
    private boolean allowCustomTag;
    @ElementCollection(targetClass = String.class)
    @Column(name = "allowedTags")
    private List<String> allowedTags;
    @Column(name = "missionType")
    private MissionType missionType;
    @Column(name = "start")
    private Date start;
    @Column(name = "end")
    private Date end;
    @ElementCollection(targetClass = String.class)
    @Column(name = "urls")
    private List<String> urls;
    @Column(name = "coverUrl")
    private String coverUrl;
    @Column(name = "requesterUsername")
    private String requesterUsername;
}
