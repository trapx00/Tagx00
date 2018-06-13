package trapx00.tagx00.vo.mission.audio;


import trapx00.tagx00.entity.mission.instance.workresult.AudioResult;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.publicdatas.mission.audio.AudioJob;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.List;

public class AudioInstanceDetailVo extends InstanceDetailVo {
    private List<AudioResult> resultList;

    public AudioInstanceDetailVo(MissionType missionType, InstanceVo instance, List<AudioResult> resultList) {
        super(missionType, instance);
        this.resultList = resultList;
    }

    public List<AudioResult> getResultList() {
        return resultList;
    }

    public void setResultList(List<AudioResult> resultList) {
        this.resultList = resultList;
    }
}
