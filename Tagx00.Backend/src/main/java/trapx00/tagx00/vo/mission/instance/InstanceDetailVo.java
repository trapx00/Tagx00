package trapx00.tagx00.vo.mission.instance;

import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;

public class InstanceDetailVo {
    private InstanceVo instance;

    public InstanceVo getInstance() {
        return instance;
    }

    public void setInstance(InstanceVo instance) {
        this.instance = instance;
    }

    public InstanceDetailVo(InstanceVo instance) {
        this.instance = instance;
    }
}
