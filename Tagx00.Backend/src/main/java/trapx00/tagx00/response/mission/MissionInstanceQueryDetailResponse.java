package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.instance.MissionInstanceDetailVo;

public class MissionInstanceQueryDetailResponse extends Response {
    private MissionInstanceDetailVo detail;

    public MissionInstanceQueryDetailResponse(MissionInstanceDetailVo detail) {
        this.detail = detail;
    }
}
