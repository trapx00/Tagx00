package trapx00.tagx00.vo.admin.mission;

import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.ArrayList;
import java.util.HashMap;

public class MissionInfo {

    private HashMap<MissionType, MissionStateTypeDistribution> typeStateDistribution;

    public MissionInfo(HashMap<MissionType, MissionStateTypeDistribution> typeStateDistribution) {
        this.typeStateDistribution = typeStateDistribution;
    }

    public HashMap<MissionType, MissionStateTypeDistribution> getTypeStateDistribution() {
        return typeStateDistribution;
    }

    public void setTypeStateDistribution(HashMap<MissionType, MissionStateTypeDistribution> typeStateDistribution) {
        this.typeStateDistribution = typeStateDistribution;
    }
}

