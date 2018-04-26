package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.publicdatas.mission.MissionType;

import java.io.Serializable;

public class InstanceDetailVo implements Serializable {
    private MissionType missionType;
    private InstanceVo instance;


    public InstanceDetailVo() {
    }

    public InstanceDetailVo(MissionType missionType, InstanceVo instance) {
        this.missionType = missionType;
        this.instance = instance;
    }


    public MissionType getMissionType() {
        return missionType;
    }

    public void setMissionType(MissionType missionType) {
        this.missionType = missionType;
    }

    public InstanceVo getInstance() {
        return instance;
    }

    public void setInstance(InstanceVo instance) {
        this.instance = instance;
    }
}
