package trapx00.tagx00.vo.mission.requester;

import trapx00.tagx00.vo.mission.missiontype.MissionVo;

import java.util.Date;
import java.util.List;

public class MissionCreateVo {
    private String title;
    private String description;
    private List<String> topics;
    private boolean allowCustomTag;
    private List<String> allowedTags;
    private MissionVo mission;
    private Date start;
    private Date end;

}
