package trapx00.tagx00.vo.admin.user;

import java.sql.Date;

public class UserRegisterDate {
    private String date;
    private int count;

    public UserRegisterDate(String date, int count) {
        this.date = date;
        this.count = count;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
