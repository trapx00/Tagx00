package trapx00.tagx00.vo.mission.missiontype;

import trapx00.tagx00.publicdatas.mission.MissionType;

public class MissionProperties {
    private MissionType type;

    public MissionProperties(MissionType type) {
        this.type = type;
    }

    public MissionType getType() {
        return type;
    }

    public void setType(MissionType type) {
        this.type = type;
    }
}
