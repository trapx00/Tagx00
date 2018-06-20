package trapx00.tagx00.util;

import trapx00.tagx00.vo.paging.PagingInfoVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public class PagingUtil {
    public static PagingInfoVo generatePagingInfoVo(PagingQueryVo pagingQueryVo, int totalCount) {
        return new PagingInfoVo(totalCount, pagingQueryVo.getPageNumber(), pagingQueryVo.getPageSize());
    }
}
