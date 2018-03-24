package trapx00.tagx00.publicdatas.mission.image.district;

import trapx00.tagx00.publicdatas.mission.image.Point;

import java.io.Serializable;
import java.util.List;

public class Boundary implements Serializable {
    List<Point> points;

    public Boundary() {
    }

    public Boundary(List<Point> points) {
        this.points = points;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
