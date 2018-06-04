package trapx00.tagx00.publicdatas.mission.threedimension.whole;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionJob;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;

public class ThreeDimensionWholeJob extends ThreeDimensionJob {

    private TagDescriptionTuple tuple;

    public ThreeDimensionWholeJob() {
        super(ThreeDimensionMissionType.WHOLE);
    }
}
