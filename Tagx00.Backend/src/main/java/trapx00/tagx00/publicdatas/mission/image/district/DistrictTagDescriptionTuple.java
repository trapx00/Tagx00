package trapx00.tagx00.publicdatas.mission.image.district;

import trapx00.tagx00.publicdatas.mission.image.Point;
import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;

import java.util.List;

class Boundary {
    List<Point> points;
}

public class DistrictTagDescriptionTuple {
    private List<Boundary> boundaries;
    private TagDescriptionTuple tagDescriptionTuple;
}
