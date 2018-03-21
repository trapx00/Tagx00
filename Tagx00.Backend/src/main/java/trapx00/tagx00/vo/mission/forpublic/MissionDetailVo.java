package trapx00.tagx00.vo.mission.forpublic;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.Date;
import java.util.List;

public abstract class MissionDetailVo {

    private MissionPublicItemVo publicItem;
    private MissionState missionState;


    public MissionDetailVo(int missionId, String title, String description, List<String> topics, boolean allowCustomTag, List<String> allowedTags, MissionType missionType, Date start, Date end, String coverUrl, String requesterUsername, MissionState missionState) {
        super(missionId, title, description, topics, allowCustomTag, allowedTags, missionType, start, end, coverUrl, requesterUsername);
        this.missionState = missionState;
    }
}
