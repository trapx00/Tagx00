package trapx00.tagx00.vo.admin.mission;

import trapx00.tagx00.publicdatas.mission.MissionType;

public class MissionStateTypeDistribution {
    private int pending;
    private int active;
    private int ended;

    public MissionStateTypeDistribution(int pending, int active, int ended, int total) {
        this.pending = pending;
        this.active = active;
        this.ended = ended;
    }

    public int getPending() {
        return pending;
    }

    public void setPending(int pending) {
        this.pending = pending;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public int getEnded() {
        return ended;
    }

    public void setEnded(int ended) {
        this.ended = ended;
    }

}
