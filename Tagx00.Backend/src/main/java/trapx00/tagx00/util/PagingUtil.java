package trapx00.tagx00.util;

import trapx00.tagx00.vo.paging.PagingInfoVo;
import trapx00.tagx00.vo.paging.PagingQueryVo;

public class PagingUtil {
    public static PagingInfoVo generatePagingInfoVo(PagingQueryVo pagingQueryVo, int totalCount) {
        int totalPage = (int) Math.ceil(pagingQueryVo.getPageNumber() * 1.0 / pagingQueryVo.getPageSize());
        return new PagingInfoVo(totalCount, pagingQueryVo.getPageNumber(), pagingQueryVo.getPageSize(), totalPage);
    }
}
