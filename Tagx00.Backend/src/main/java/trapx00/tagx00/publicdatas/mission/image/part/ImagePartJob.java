package trapx00.tagx00.publicdatas.mission.image.part;

import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.vo.mission.image.ImageJobType;

import java.util.List;

public class ImagePartJob extends ImageJob {
    private List<PartTagDescriptionTuple> tuples;

    public ImagePartJob(ImageJobType type, List<PartTagDescriptionTuple> tuples) {
        super(type);
        this.tuples = tuples;
    }

    public List<PartTagDescriptionTuple> getTuples() {
        return tuples;
    }

    public void setTuples(List<PartTagDescriptionTuple> tuples) {
        this.tuples = tuples;
    }
}
