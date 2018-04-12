package trapx00.tagx00.publicdatas.mission;

import java.util.Map;

public class MissionTypeName {
    public final static String IMAGE_TYPE_NAME = "image";

    public static Map<String, MissionType> missionTypeMap;
    public static Map<MissionType, String> typeMissionMap;

    static {
        missionTypeMap.put(IMAGE_TYPE_NAME, MissionType.IMAGE);
        typeMissionMap.put(MissionType.IMAGE, IMAGE_TYPE_NAME);
    }
}
