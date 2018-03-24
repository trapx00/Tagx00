package trapx00.tagx00.util;

import trapx00.tagx00.MainApplication;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Arrays;
import java.util.stream.Collectors;

public class ResourceUtil {
    public static URL getResource(String path) {
        return MainApplication.class.getResource(path);
    }

    public static String getFilePathUnderRootDirOfJarFileOrClassDir(String relativePath) {
        String path = MainApplication.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String[] paths = path.split("!");
        File jarFile = new File(paths[0].split(":")[1]);

        System.out.println(jarFile.getParent());
        return jarFile.getParent() + relativePath;

    }
}
