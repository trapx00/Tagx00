package trapx00.tagx00.util;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.publicdatas.mission.MissionTypeName;

public class MissionUtil {
    public static MissionType getType(String id) {
        return MissionTypeName.missionTypeMap.get(id.split("-")[0]);
    }

    public static int getId(String id) {
        return Integer.parseInt(id.split("-")[1]);
    }

    public static String addTypeToId(int id, MissionType missionType) {
        return id + MissionTypeName.typeMissionMap.get(missionType);
    }
}
