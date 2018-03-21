package trapx00.tagx00.vo.mission.forpublic;

import trapx00.tagx00.entity.annotation.Column;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.Date;
import java.util.List;

public abstract class MissionDetailVo {

    private MissionPublicItemVo publicItem;
    private MissionState missionState;

    public MissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState) {
        this.publicItem = publicItem;
        this.missionState = missionState;
    }
}
