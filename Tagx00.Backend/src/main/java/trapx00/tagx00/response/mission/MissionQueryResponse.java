package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.requester.MissionRequesterQueryItemVo;

import java.util.List;

public class MissionQueryResponse extends Response {
    private List<MissionRequesterQueryItemVo> items;

    public MissionQueryResponse(List<MissionRequesterQueryItemVo> items) {
        this.items = items;
    }
}
