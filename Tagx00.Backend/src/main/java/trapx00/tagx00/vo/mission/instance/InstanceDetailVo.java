package trapx00.tagx00.vo.mission.instance;

import java.io.Serializable;

public class InstanceDetailVo implements Serializable {
    private InstanceVo instance;

    public InstanceVo getInstance() {
        return instance;
    }

    public InstanceDetailVo() {
    }

    public void setInstance(InstanceVo instance) {
        this.instance = instance;
    }

    public InstanceDetailVo(InstanceVo instance) {
        this.instance = instance;
    }
}
