package trapx00.tagx00.vo.admin.mission;

import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.List;

public class MissionStateTypeDistribution {
    private List<MissionBrief> pending;
    private List<MissionBrief> active;
    private List<MissionBrief> ended;

    public MissionStateTypeDistribution(List<MissionBrief> pending, List<MissionBrief> active, List<MissionBrief> ended) {
        this.pending = pending;
        this.active = active;
        this.ended = ended;
    }

    public List<MissionBrief> getPending() {
        return pending;
    }

    public void setPending(List<MissionBrief> pending) {
        this.pending = pending;
    }

    public List<MissionBrief> getActive() {
        return active;
    }

    public void setActive(List<MissionBrief> active) {
        this.active = active;
    }

    public List<MissionBrief> getEnded() {
        return ended;
    }

    public void setEnded(List<MissionBrief> ended) {
        this.ended = ended;
    }
}
