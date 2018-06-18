package trapx00.tagx00.vo.admin.credit;

import trapx00.tagx00.publicdatas.mission.MissionType;

public class CreditTypeDistribution {
    private int low;
    private int q1;
    private int median;
    private int q3;
    private int high;

    public CreditTypeDistribution(int low, int q1, int median, int q3, int high) {
        this.low = low;
        this.q1 = q1;
        this.median = median;
        this.q3 = q3;
        this.high = high;
    }


    public int getLow() {
        return low;
    }

    public void setLow(int low) {
        this.low = low;
    }

    public int getQ1() {
        return q1;
    }

    public void setQ1(int q1) {
        this.q1 = q1;
    }

    public int getMedian() {
        return median;
    }

    public void setMedian(int median) {
        this.median = median;
    }

    public int getQ3() {
        return q3;
    }

    public void setQ3(int q3) {
        this.q3 = q3;
    }

    public int getHigh() {
        return high;
    }

    public void setHigh(int high) {
        this.high = high;
    }
}
