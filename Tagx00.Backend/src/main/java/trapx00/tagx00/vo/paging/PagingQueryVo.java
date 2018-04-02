package trapx00.tagx00.vo.paging;

import java.io.Serializable;

public class PagingQueryVo implements Serializable {
    int pageSize;
    int pageNumber;

    public PagingQueryVo() {
    }

    public PagingQueryVo(int pageSize, int pageNumber) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }
}
