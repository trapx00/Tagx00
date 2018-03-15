package trapx00.tagx00.publicdatas.mission.image.whole;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.image.ImageJob;
import trapx00.tagx00.vo.mission.image.ImageJobType;

public class ImageWholeJob extends ImageJob {
    private TagDescriptionTuple tuple;

    public ImageWholeJob(ImageJobType type, TagDescriptionTuple tuple) {
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
