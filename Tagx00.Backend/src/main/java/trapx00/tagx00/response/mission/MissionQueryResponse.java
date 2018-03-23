package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class MissionQueryResponse extends Response {
    private List<MissionPublicItemVo> items;

    public MissionQueryResponse(List<MissionPublicItemVo> items) {
        this.items = items;
    }

    public List<MissionPublicItemVo> getItems() {
        return items;
    }

    public void setItems(List<MissionPublicItemVo> items) {
        this.items = items;
    }
}
