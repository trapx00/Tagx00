package trapx00.tagx00.util;

import org.springframework.beans.factory.annotation.Autowired;
import trapx00.tagx00.data.dao.user.UserDao;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;

import java.io.File;

public class PathUtil {
    public final static String TEMP_FILE_NAME = "Tagx00";
    private final UserDao userDao;

    @Autowired
    public PathUtil(UserDao userDao) {
        this.userDao = userDao;
    }

    static {
        File tmpDir = new File(getTmpPath());
        if (!tmpDir.exists()) {
            tmpDir.mkdirs();
        }
    }

    public static String getTmpPath() {
        java.util.Properties properties = System.getProperties();
        String tempFileName = properties.getProperty("java.io.tmpdir");
        return tempFileName + TEMP_FILE_NAME;
    }

    public static void initFile() {
        File dataDir = new File(getDatabasePath());
        File serDir = new File(getSerPath());
        if (!dataDir.exists()) {
            dataDir.mkdirs();
        }
        if (!serDir.exists()) {
            serDir.mkdirs();
        }
    }

    public static String getStaticPath() {
        return new File("static/").getAbsolutePath() + "/";
    }

    public static String getDatabasePath() {
        return ResourceUtil.getFilePathUnderRootDirOfJarFileOrClassDir("/data/");
    }

    public static String getSerPath() {
        return ResourceUtil.getFilePathUnderRootDirOfJarFileOrClassDir("/data/ser/");
    }

    public void initDatabase() {
        userDao.save(new User("999", "$2a$10$EQezV9FHSbCgagwHb6K8g.o.TmwFjh4wMLSUU.8f7PhSLpBpivhO.", "445073309@qq.com", Role.ADMIN, 0, 0));
        userDao.save(new User("888", "$2a$10$EQezV9FHSbCgagwHb6K8g.o.TmwFjh4wMLSUU.8f7PhSLpBpivhO.", "445073309@qq.com", Role.REQUESTER, 0, 0));
        userDao.save(new User("123", "$2a$10$EQezV9FHSbCgagwHb6K8g.o.TmwFjh4wMLSUU.8f7PhSLpBpivhO.", "445073309@qq.com", Role.WORKER, 0, 0));
    }

    public static String getResourceUrl(String filePath) {
        return "http://localhost:8080/" + filePath;
    }
}
