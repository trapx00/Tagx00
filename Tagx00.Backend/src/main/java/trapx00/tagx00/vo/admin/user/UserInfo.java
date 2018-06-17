package trapx00.tagx00.vo.admin.user;

import java.util.ArrayList;
import java.util.HashMap;

public class UserInfo {
    private int requesterCount;
    private int workerCount;
    private HashMap<String, Integer> registerDateDistribution;

    public UserInfo(int requesterCount, int workerCount, HashMap<String, Integer> registerDateDistribution) {
        this.requesterCount = requesterCount;
        this.workerCount = workerCount;
        this.registerDateDistribution = registerDateDistribution;
    }

    public int getRequesterCount() {
        return requesterCount;
    }

    public void setRequesterCount(int requesterCount) {
        this.requesterCount = requesterCount;
    }

    public int getWorkerCount() {
        return workerCount;
    }

    public void setWorkerCount(int workerCount) {
        this.workerCount = workerCount;
    }

    public HashMap<String, Integer> getRegisterDateDistribution() {
        return registerDateDistribution;
    }

    public void setRegisterDateDistribution(HashMap<String, Integer> registerDateDistribution) {
        this.registerDateDistribution = registerDateDistribution;
    }
}
