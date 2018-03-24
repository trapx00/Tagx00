package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;

public class InstanceDetailResponse extends Response {
    private InstanceDetailVo detail;

    public InstanceDetailResponse() {
    }

    public InstanceDetailResponse(InstanceDetailVo detail) {
        this.detail = detail;
    }

    public InstanceDetailVo getDetail() {
        return detail;
    }

    public void setDetail(InstanceDetailVo detail) {
        this.detail = detail;
    }
}
