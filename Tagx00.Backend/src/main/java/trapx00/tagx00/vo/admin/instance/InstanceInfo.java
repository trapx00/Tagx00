package trapx00.tagx00.vo.admin.instance;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.requester.MissionDateNumVo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class InstanceInfo {
    private HashMap<String, List<String>> acceptDateDistribution;
    private HashMap<MissionType, InstanceStateTypeDistribution> typeStateDistribution;

    public InstanceInfo(HashMap<String, List<String>> acceptDateDistribution, HashMap<MissionType, InstanceStateTypeDistribution> typeStateDistribution) {
        this.acceptDateDistribution = acceptDateDistribution;
        this.typeStateDistribution = typeStateDistribution;
    }

    public HashMap<String, List<String>> getAcceptDateDistribution() {
        return acceptDateDistribution;
    }

    public void setAcceptDateDistribution(HashMap<String, List<String>> acceptDateDistribution) {
        this.acceptDateDistribution = acceptDateDistribution;
    }

    public HashMap<MissionType, InstanceStateTypeDistribution> getTypeStateDistribution() {
        return typeStateDistribution;
    }

    public void setTypeStateDistribution(HashMap<MissionType, InstanceStateTypeDistribution> typeStateDistribution) {
        this.typeStateDistribution = typeStateDistribution;
    }
}


