package trapx00.tagx00.vo.mission.video;


import trapx00.tagx00.entity.mission.instance.workresult.VideoResult;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.List;

public class VideoInstanceDetailVo extends InstanceDetailVo {
    private List<VideoResult> resultList;

    public VideoInstanceDetailVo() {
    }

    public VideoInstanceDetailVo(MissionType missionType, InstanceVo instance, List<VideoResult> resultList) {
        super(missionType, instance);
        this.resultList = resultList;
    }

    public List<VideoResult> getResultList() {
        return resultList;
    }

    public void setResultList(List<VideoResult> resultList) {
        this.resultList = resultList;
    }
}
