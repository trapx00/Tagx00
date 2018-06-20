package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.instance.InstanceVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;

import java.util.List;

public class InstanceResponse extends Response {
    private List<InstanceVo> instances;
    private PagingInfoVo pagingInfo;

    public InstanceResponse(List<InstanceVo> instances, PagingInfoVo pagingInfoVo) {
        this.instances = instances;
        this.pagingInfo = pagingInfoVo;
    }

    public InstanceResponse(List<InstanceVo> instances) {
        this.instances = instances;
    }

    public List<InstanceVo> getInstances() {
        return instances;
    }

    public void setInstances(List<InstanceVo> instances) {
        this.instances = instances;
    }

    public PagingInfoVo getPagingInfo() {
        return pagingInfo;
    }

    public void setPagingInfo(PagingInfoVo pagingInfo) {
        this.pagingInfo = pagingInfo;
    }
}
