package trapx00.tagx00.vo.leaderboard;

import java.io.Serializable;

public class ExpLeaderboardUserVo implements Serializable {
    private String username;
    private double exp;
    private int level;
    private int order;

    public ExpLeaderboardUserVo() {
    }

    public ExpLeaderboardUserVo(String username, double exp, int level, int order) {
        this.username = username;
        this.exp = exp;
        this.level = level;
        this.order = order;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getExp() {
        return exp;
    }

    public void setExp(double exp) {
        this.exp = exp;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
