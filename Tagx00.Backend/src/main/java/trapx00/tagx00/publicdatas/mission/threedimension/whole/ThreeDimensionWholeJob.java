package trapx00.tagx00.publicdatas.mission.threedimension.whole;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.threedimension.ThreeDimensionJob;
import trapx00.tagx00.vo.mission.threedimension.ThreeDimensionMissionType;

public class ThreeDimensionWholeJob extends ThreeDimensionJob {

    private TagDescriptionTuple tuple;

    public ThreeDimensionWholeJob() {
        super(ThreeDimensionMissionType.WHOLE);
    }

    public ThreeDimensionWholeJob(ThreeDimensionMissionType type, TagDescriptionTuple tuple) {
        super(type);
        this.tuple = tuple;
    }

    public TagDescriptionTuple getTuple() {
        return tuple;
    }

    public void setTuple(TagDescriptionTuple tuple) {
        this.tuple = tuple;
    }
}
