package trapx00.tagx00.util;

public class LevelUtil {
    private static final int initExp = 20;
    private static final int maxLevel = 100;
    private static final int splitLevel = 10;
    private static int[] levels;

    static {
        levels = new int[maxLevel];
        levels[0] = initExp;
        for (int i = 1; i < splitLevel; i++) {
            levels[i] = levels[i - 1] * levels[i - 1] + levels[i - 1];
        }
        for (int i = splitLevel; i < maxLevel; i++) {
            levels[i] = 2 * levels[i - 1] + levels[i - 1];
        }
    }

    public static int[] getLevels() {
        return levels;
    }

    public static int caculateLevel(double exp) {
        for (int i = 0; i < maxLevel - 1; i++) {
            if (exp > levels[i] && exp < levels[i + 1]) {
                return i + 1;
            }
        }
        return 100;
    }
}
