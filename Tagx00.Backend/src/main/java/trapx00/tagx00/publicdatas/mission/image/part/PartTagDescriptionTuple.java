package trapx00.tagx00.publicdatas.mission.image.part;

import trapx00.tagx00.publicdatas.mission.TagDescriptionTuple;
import trapx00.tagx00.publicdatas.mission.image.Point;

import java.io.Serializable;

public class PartTagDescriptionTuple implements Serializable {
    private Point leftTopPoint;
    private Point rightBottomPoint;

    private TagDescriptionTuple tagDescriptionTuple;

    public PartTagDescriptionTuple() {
    }

    public PartTagDescriptionTuple(Point leftTopPoint, Point rightBottomPoint, TagDescriptionTuple tagDescriptionTuple) {
        this.leftTopPoint = leftTopPoint;
        this.rightBottomPoint = rightBottomPoint;
        this.tagDescriptionTuple = tagDescriptionTuple;
    }

    public Point getLeftTopPoint() {
        return leftTopPoint;
    }

    public void setLeftTopPoint(Point leftTopPoint) {
        this.leftTopPoint = leftTopPoint;
    }

    public Point getRightBottomPoint() {
        return rightBottomPoint;
    }

    public void setRightBottomPoint(Point rightBottomPoint) {
        this.rightBottomPoint = rightBottomPoint;
    }

    public TagDescriptionTuple getTagDescriptionTuple() {
        return tagDescriptionTuple;
    }

    public void setTagDescriptionTuple(TagDescriptionTuple tagDescriptionTuple) {
        this.tagDescriptionTuple = tagDescriptionTuple;
    }
}
