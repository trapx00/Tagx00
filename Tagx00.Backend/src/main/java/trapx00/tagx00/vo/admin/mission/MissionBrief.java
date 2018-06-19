package trapx00.tagx00.vo.admin.mission;

import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.publicdatas.mission.MissionType;

public class MissionBrief {
    private String missionId;
    private MissionType missionType;
    private MissionState missionState;

    public MissionBrief(String missionId, MissionType missionType, MissionState missionState) {
        this.missionId = missionId;
        this.missionType = missionType;
        this.missionState = missionState;
    }

    public String getMissionId() {
        return missionId;
    }

    public void setMissionId(String missionId) {
        this.missionId = missionId;
    }

    public MissionType getMissionType() {
        return missionType;
    }

    public void setMissionType(MissionType missionType) {
        this.missionType = missionType;
    }

    public MissionState getMissionState() {
        return missionState;
    }

    public void setMissionState(MissionState missionState) {
        this.missionState = missionState;
    }

}
