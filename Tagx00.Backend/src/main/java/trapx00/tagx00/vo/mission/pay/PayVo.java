package trapx00.tagx00.vo.mission.pay;

import java.io.Serializable;

public class PayVo implements Serializable {
    private int credits;

    public PayVo() {
    }

    public PayVo(int credits) {
        this.credits = credits;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }
}
