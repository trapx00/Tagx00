package trapx00.tagx00.util;

public class LevelUtil {
    private static final int initExp = 1;
    private static final int maxLevel = 30;
    private static final int splitLevel = 5;
    private static int[] levels;

    static {
        levels = new int[maxLevel];
        levels[0] = 0;
        levels[1] = initExp;
        for(int i=2;i<maxLevel;i++) {
            levels[i] = levels[i-1]*2;
        }
    }

    public static int[] getLevels() {
        return levels;
    }

    public static int calculateLevel(double exp) {
        if (exp <= levels[0]) {
            return 1;
        }
        for (int i = 0; i < maxLevel - 1; i++) {
            if (exp > levels[i] && exp <= levels[i + 1]) {
                return i + 2;
            }
        }
        return 32;
    }
}
