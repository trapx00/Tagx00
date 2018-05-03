package trapx00.tagx00.vo.mission.requester;

import java.io.Serializable;

public class MissionDateNumVo implements Serializable {
    private String date;
    private int num;

    public MissionDateNumVo() {
    }

    public MissionDateNumVo(String date, int num) {
        this.date = date;
        this.num = num;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
