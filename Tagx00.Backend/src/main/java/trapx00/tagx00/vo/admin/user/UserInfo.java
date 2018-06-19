package trapx00.tagx00.vo.admin.user;

import trapx00.tagx00.vo.user.info.RequesterInfoVo;
import trapx00.tagx00.vo.user.info.UserInfoVo;
import trapx00.tagx00.vo.user.info.WorkerInfoVo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class UserInfo {
    private List<String> requesters;
    private List<String> workers;
    private HashMap<String, List<String>> registerDateDistribution;

    public UserInfo(List<String> requesters, List<String> workers, HashMap<String, List<String>> registerDateDistribution) {
        this.requesters = requesters;
        this.workers = workers;
        this.registerDateDistribution = registerDateDistribution;
    }

    public List<String> getWorkers() {
        return workers;
    }

    public void setWorkers(List<String> workers) {
        this.workers = workers;
    }

    public HashMap<String, List<String>> getRegisterDateDistribution() {
        return registerDateDistribution;
    }

    public void setRegisterDateDistribution(HashMap<String, List<String>> registerDateDistribution) {
        this.registerDateDistribution = registerDateDistribution;
    }

    public List<String> getRequesters() {
        return requesters;
    }

    public void setRequesters(List<String> requesters) {
        this.requesters = requesters;
    }
}

