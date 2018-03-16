package trapx00.tagx00.data.dao.mission;

import trapx00.tagx00.entity.mission.Instance;

public interface InstanceDao {

    Instance[] findInstancesBymissionId(int missionId);

    Instance[] findInstanceByusername(String username);

    Instance findInstanceByinstanceId(int instanceId);


    Instance findInstanceByUsernameAndmissionId(String username,int missionId);
}
