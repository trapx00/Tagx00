package trapx00.tagx00.util;

import trapx00.tagx00.MainApplication;

public class PathUtil {
    public final static String TEMP_FILE_NAME = "Tagx00";

    public static String getTmpPath() {
        java.util.Properties properties = System.getProperties();
        String tempFileName = properties.getProperty("java.io.tmpdir");
        return tempFileName + TEMP_FILE_NAME;
    }

    public static String getDatabasePath() {
        return MainApplication.class.getResource("../../../resources/data/").getPath();
    }
}
