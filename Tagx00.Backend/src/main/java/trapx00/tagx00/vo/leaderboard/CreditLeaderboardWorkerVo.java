package trapx00.tagx00.vo.leaderboard;

import java.io.Serializable;

public class CreditLeaderboardWorkerVo implements Serializable {
    private String username;
    private int credits;
    private int order;

    public CreditLeaderboardWorkerVo() {
    }

    public CreditLeaderboardWorkerVo(String username, int credits, int order) {
        this.username = username;
        this.credits = credits;
        this.order = order;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
