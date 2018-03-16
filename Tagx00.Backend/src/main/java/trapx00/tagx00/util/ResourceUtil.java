package trapx00.tagx00.util;

import trapx00.tagx00.MainApplication;

import java.io.File;
import java.net.URL;
import java.util.Arrays;
import java.util.stream.Collectors;

public class ResourceUtil {
    public static URL getResource(String path) {
        return MainApplication.class.getResource(path);
    }

    public static String getFilePathUnderRootDirOfJarFileOrClassDir(String relativePath) {
        String filePath = MainApplication.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String[] paths = filePath.split(File.separator); // last item is the file name
        String dir = Arrays.stream(paths)
                .limit(paths.length-1)
                .collect(Collectors.joining(File.separator)); // ignore the last item and join the directories
        return dir + relativePath;

    }
}
