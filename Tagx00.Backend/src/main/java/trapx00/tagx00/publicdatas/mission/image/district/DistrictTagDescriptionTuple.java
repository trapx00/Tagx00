package trapx00.tagx00.publicdatas.mission.image.district;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.image.Point;

import java.io.Serializable;
import java.util.List;

public class DistrictTagDescriptionTuple implements Serializable {
    private List<Boundary> boundaries;
    private TagDescriptionTuple tagDescriptionTuple;

    public DistrictTagDescriptionTuple() {
    }

    public DistrictTagDescriptionTuple(List<Boundary> boundaries, TagDescriptionTuple tagDescriptionTuple) {
        this.boundaries = boundaries;
        this.tagDescriptionTuple = tagDescriptionTuple;
    }

    public List<Boundary> getBoundaries() {
        return boundaries;
    }

    public void setBoundaries(List<Boundary> boundaries) {
        this.boundaries = boundaries;
    }

    public TagDescriptionTuple getTagDescriptionTuple() {
        return tagDescriptionTuple;
    }

    public void setTagDescriptionTuple(TagDescriptionTuple tagDescriptionTuple) {
        this.tagDescriptionTuple = tagDescriptionTuple;
    }
}
