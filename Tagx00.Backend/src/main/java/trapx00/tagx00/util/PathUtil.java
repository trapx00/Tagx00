package trapx00.tagx00.util;

import trapx00.tagx00.MainApplication;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

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

    public static String getSerPath() {
        return MainApplication.class.getResource("../../../resources/data/ser/").getPath();
    }

    public static void initDatabase() {
        String resourcePath = MainApplication.class.getResource("../../../resources/").getPath();
        File dir = new File(resourcePath + "data");
        if (!dir.exists()) {
            dir.mkdir();
        }
        dir = new File(resourcePath + "data/ser");
        if (!dir.exists()) {
            dir.mkdir();
        }

        ArrayList<File> fileArrayList = new ArrayList<>();
        fileArrayList.add(new File(resourcePath + "data/user.txt"));
        fileArrayList.add(new File(resourcePath + "data/imageResult.txt"));
        fileArrayList.add(new File(resourcePath + "data/instance.txt"));
        fileArrayList.add(new File(resourcePath + "data/mission.txt"));

        for (File file : fileArrayList) {
            try {
                if (!file.exists()) {
                    file.createNewFile();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
