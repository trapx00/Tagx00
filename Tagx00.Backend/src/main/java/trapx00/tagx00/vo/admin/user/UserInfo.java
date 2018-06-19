package trapx00.tagx00.vo.admin.user;

import trapx00.tagx00.vo.user.info.RequesterInfoVo;
import trapx00.tagx00.vo.user.info.UserInfoVo;
import trapx00.tagx00.vo.user.info.WorkerInfoVo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class UserInfo {
    private List<RequesterInfoVo> requesters;
    private List<WorkerInfoVo> workers;
    private HashMap<String, List<UserInfoVo>> registerDateDistribution;

    public UserInfo(List<RequesterInfoVo> requesters, List<WorkerInfoVo> workers, HashMap<String, List<UserInfoVo>> registerDateDistribution) {
        this.requesters = requesters;
        this.workers = workers;
        this.registerDateDistribution = registerDateDistribution;
    }

    public List<RequesterInfoVo> getRequesters() {
        return requesters;
    }

    public void setRequesters(List<RequesterInfoVo> requesters) {
        this.requesters = requesters;
    }

    public List<WorkerInfoVo> getWorkers() {
        return workers;
    }

    public void setWorkers(List<WorkerInfoVo> workers) {
        this.workers = workers;
    }

    public HashMap<String, List<UserInfoVo>> getRegisterDateDistribution() {
        return registerDateDistribution;
    }

    public void setRegisterDateDistribution(HashMap<String, List<UserInfoVo>> registerDateDistribution) {
        this.registerDateDistribution = registerDateDistribution;
    }
}

