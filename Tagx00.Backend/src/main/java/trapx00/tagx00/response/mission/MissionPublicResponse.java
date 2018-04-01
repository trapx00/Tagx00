package trapx00.tagx00.response.mission;

import trapx00.tagx00.response.Response;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;
import trapx00.tagx00.vo.paging.PagingInfoVo;

import java.util.List;

public class MissionPublicResponse extends Response {
    private PagingInfoVo pagingInfoVo;
    private List<MissionPublicItemVo> items;

    public MissionPublicResponse() {
    }

    public MissionPublicResponse(PagingInfoVo pagingInfoVo, List<MissionPublicItemVo> items) {
        this.pagingInfoVo = pagingInfoVo;
        this.items = items;
    }

    public PagingInfoVo getPagingInfoVo() {
        return pagingInfoVo;
    }

    public void setPagingInfoVo(PagingInfoVo pagingInfoVo) {
        this.pagingInfoVo = pagingInfoVo;
    }

    public List<MissionPublicItemVo> getItems() {
        return items;
    }

    public void setItems(List<MissionPublicItemVo> items) {
        this.items = items;
    }
}
