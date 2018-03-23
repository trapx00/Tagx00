package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.List;

public class InstanceResponse extends Response {
    private List<InstanceVo> instances;

    public InstanceResponse(List<InstanceVo> instances) {
        this.instances = instances;
    }

    public List<InstanceVo> getInstances() {
        return instances;
    }

    public void setInstances(List<InstanceVo> instances) {
        this.instances = instances;
    }
}
