package trapx00.tagx00.publicdatas.mission.image.district;

import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.vo.mission.image.ImageMissionType;

import java.util.List;

public class DistrictJob extends ImageJob {
    private List<DistrictTagDescriptionTuple> tuples;

    public DistrictJob() {
    }

    public DistrictJob(ImageMissionType type, List<DistrictTagDescriptionTuple> tuples) {
        super(type);
        this.tuples = tuples;
    }

    public List<DistrictTagDescriptionTuple> getTuples() {
        return tuples;
    }

    public void setTuples(List<DistrictTagDescriptionTuple> tuples) {
        this.tuples = tuples;
    }
}
