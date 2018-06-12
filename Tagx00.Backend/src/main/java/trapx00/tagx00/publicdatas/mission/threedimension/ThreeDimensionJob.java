package trapx00.tagx00.publicdatas.mission.threedimension;

import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;

import java.io.Serializable;

public class ThreeDimensionJob implements Serializable {
    private ThreeDimensionMissionType type;

    public ThreeDimensionJob(ThreeDimensionMissionType type) {
        this.type = type;
    }

    public ThreeDimensionMissionType getType() {
        return type;
    }

    public void setType(ThreeDimensionMissionType type) {
        this.type = type;
    }
}
