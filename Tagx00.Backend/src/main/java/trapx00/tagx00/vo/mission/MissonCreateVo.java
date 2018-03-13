package trapx00.tagx00.vo.mission;

import trapx00.tagx00.vo.mission.missiontype.MissionVo;

import java.util.Date;
import java.util.List;

public class MissonCreateVo {
    private String title;
    private String description;
    private List<String> allowedTags;
    private MissionVo mission;
    private Date start;
    private Date end;

}
