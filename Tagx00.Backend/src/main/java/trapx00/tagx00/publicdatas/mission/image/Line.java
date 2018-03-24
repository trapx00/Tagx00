package trapx00.tagx00.publicdatas.mission.image;

import java.io.Serializable;
import java.util.List;

public class Line implements Serializable {
    private List<Point> points;

    public Line() {
    }

    public Line(List<Point> points) {
        this.points = points;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
