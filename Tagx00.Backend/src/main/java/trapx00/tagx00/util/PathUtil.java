package trapx00.tagx00.util;

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
        return ResourceUtil.getFilePathUnderRootDirOfJarFileOrClassDir("/data/");
    }

    public static String getSerPath() {
        return ResourceUtil.getFilePathUnderRootDirOfJarFileOrClassDir("/data/ser/");
    }

    public static void initDatabase() {
        String resourcePath = ResourceUtil.getFilePathUnderRootDirOfJarFileOrClassDir("/data");

        File dir = new File(resourcePath);
        if (!dir.exists()) {
            dir.mkdir();
        }

        dir = new File(resourcePath + "/ser");
        if (!dir.exists()) {
            dir.mkdir();
        }

        ArrayList<File> fileArrayList = new ArrayList<>();
        fileArrayList.add(new File(resourcePath + "/user.txt"));
        fileArrayList.add(new File(resourcePath + "/imageResult.txt"));
        fileArrayList.add(new File(resourcePath + "/instance.txt"));
        fileArrayList.add(new File(resourcePath + "/mission.txt"));

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
