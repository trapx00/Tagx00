package trapx00.tagx00.vo.mission.requester;

import java.io.Serializable;

public class MissionFinalizeVo implements Serializable {
    private double expRatio;
    private int credits;
    private String comment;

    public MissionFinalizeVo() {
    }

    public MissionFinalizeVo(double expRatio, int credits, String comment) {
        this.expRatio = expRatio;
        this.credits = credits;
        this.comment = comment;
    }

    public double getExpRatio() {
        return expRatio;
    }

    public void setExpRatio(double expRatio) {
        this.expRatio = expRatio;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
