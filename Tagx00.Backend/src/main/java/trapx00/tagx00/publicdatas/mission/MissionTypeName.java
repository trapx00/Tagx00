package trapx00.tagx00.publicdatas.mission;

import java.util.HashMap;
import java.util.Map;

public class MissionTypeName {
    public final static String IMAGE_TYPE_NAME = "image";
    public final static String TEXT_TYPE_NAME = "text";
    public final static String AUDIO_TYPE_NAME = "audio";
    public final static String VIDEO_TYPE_NAME = "video";
    public final static String THREE_DIMENSION_TYPE_NAME = "3d";

    public static Map<String, MissionType> missionTypeMap = new HashMap<>();
    public static Map<MissionType, String> typeMissionMap = new HashMap<>();

    static {
        missionTypeMap.put(IMAGE_TYPE_NAME, MissionType.IMAGE);
        missionTypeMap.put(TEXT_TYPE_NAME, MissionType.TEXT);
        missionTypeMap.put(AUDIO_TYPE_NAME, MissionType.AUDIO);
        missionTypeMap.put(VIDEO_TYPE_NAME, MissionType.VIDEO);
        missionTypeMap.put(THREE_DIMENSION_TYPE_NAME, MissionType.THREE_DIMENSION);
        typeMissionMap.put(MissionType.IMAGE, IMAGE_TYPE_NAME);
        typeMissionMap.put(MissionType.TEXT, TEXT_TYPE_NAME);
        typeMissionMap.put(MissionType.AUDIO, AUDIO_TYPE_NAME);
        typeMissionMap.put(MissionType.VIDEO, VIDEO_TYPE_NAME);
        typeMissionMap.put(MissionType.THREE_DIMENSION, THREE_DIMENSION_TYPE_NAME);
    }
}
