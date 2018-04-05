package trapx00.tagx00.publicdatas.mission;

import java.util.Map;

public class MissionTypeName {
    public final static String IMAGE_TYPE_NAME = "image";

    public static Map<String, MissionType> missionTypeMap;

    static {
        missionTypeMap.put(IMAGE_TYPE_NAME, MissionType.IMAGE);
    }
}
