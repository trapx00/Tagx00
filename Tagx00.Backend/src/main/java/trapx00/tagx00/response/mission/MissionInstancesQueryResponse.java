package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.instance.MissionInstanceItemVo;

import java.util.List;

public class MissionInstancesQueryResponse extends Response {
    private List<MissionInstanceItemVo> items;

    public MissionInstancesQueryResponse(List<MissionInstanceItemVo> items) {
        this.items = items;
    }
}
