package trapx00.tagx00.vo.admin.instance;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.requester.MissionDateNumVo;

import java.util.ArrayList;
import java.util.HashMap;

public class InstanceInfo {
    private HashMap<String, Integer> acceptDateDistribution;
    private HashMap<MissionType, InstanceStateTypeDistribution> typeStateDistribution;

    public InstanceInfo(HashMap<String, Integer> acceptDateDistribution, HashMap<MissionType, InstanceStateTypeDistribution> typeStateDistribution) {
        this.acceptDateDistribution = acceptDateDistribution;
        this.typeStateDistribution = typeStateDistribution;
    }

    public HashMap<String, Integer> getAcceptDateDistribution() {
        return acceptDateDistribution;
    }

    public void setAcceptDateDistribution(HashMap<String, Integer> acceptDateDistribution) {
        this.acceptDateDistribution = acceptDateDistribution;
    }

    public HashMap<MissionType, InstanceStateTypeDistribution> getTypeStateDistribution() {
        return typeStateDistribution;
    }

    public void setTypeStateDistribution(HashMap<MissionType, InstanceStateTypeDistribution> typeStateDistribution) {
        this.typeStateDistribution = typeStateDistribution;
    }
}


