package trapx00.tagx00.vo.mission.threedimension;

import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionJob;
import trapx00.tagx00.publicdatas.mission.threedimension.whole.ThreeDimensionWholeJob;

public enum ThreeDimensionMissionType {
    WHOLE(ThreeDimensionWholeJob.class);

    public final Class<? extends ThreeDimensionJob> clazz;

    ThreeDimensionMissionType(Class<? extends ThreeDimensionJob> clazz) {
        this.clazz = clazz;
    }

    public Class<? extends ThreeDimensionJob> getClazz() {
        return clazz;
    }
}
