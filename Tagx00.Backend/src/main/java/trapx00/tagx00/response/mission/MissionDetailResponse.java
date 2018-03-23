package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.forpublic.MissionDetailVo;

public class MissionDetailResponse extends Response {
    private MissionDetailVo detail;

    public MissionDetailResponse(MissionDetailVo detail) {
        this.detail = detail;
    }

    public MissionDetailVo getDetail() {
        return detail;
    }

    public void setDetail(MissionDetailVo detail) {
        this.detail = detail;
    }
}
