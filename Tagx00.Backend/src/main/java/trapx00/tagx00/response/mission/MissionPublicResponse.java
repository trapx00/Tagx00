package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.List;

public class MissionPublicResponse extends Response {
    private List<MissionPublicItemVo> items;

    public MissionPublicResponse() {
    }

    public MissionPublicResponse(List<MissionPublicItemVo> items) {
        this.items = items;
    }

    public List<MissionPublicItemVo> getItems() {
        return items;
    }

    public void setItems(List<MissionPublicItemVo> items) {
        this.items = items;
    }
}
