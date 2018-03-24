package trapx00.tagx00.vo.mission.forpublic;

import trapx00.tagx00.publicdatas.mission.MissionState;

import java.io.Serializable;

public abstract class MissionDetailVo implements Serializable {

    private MissionPublicItemVo publicItem;
    private MissionState missionState;

    public MissionDetailVo(MissionPublicItemVo publicItem, MissionState missionState) {
        this.publicItem = publicItem;
        this.missionState = missionState;
    }

    public MissionPublicItemVo getPublicItem() {
        return publicItem;
    }

    public void setPublicItem(MissionPublicItemVo publicItem) {
        this.publicItem = publicItem;
    }

    public MissionState getMissionState() {
        return missionState;
    }

    public void setMissionState(MissionState missionState) {
        this.missionState = missionState;
    }
}
