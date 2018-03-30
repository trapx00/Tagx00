package trapx00.tagx00.vo.paging;

import java.io.Serializable;

public class PagingInfoVo implements Serializable {
    private int totalCount;
    private int currentPage;
    private int pageSize;
    private int totalPages;

    public PagingInfoVo() {
    }

    public PagingInfoVo(int totalCount, int currentPage, int pageSize, int totalPages) {
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
