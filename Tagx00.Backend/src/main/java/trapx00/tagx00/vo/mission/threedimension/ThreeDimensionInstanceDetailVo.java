package trapx00.tagx00.vo.mission.threedimension;

import trapx00.tagx00.entity.mission.instance.workresult.ThreeDimensionResult;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.List;

public class  ThreeDimensionInstanceDetailVo extends InstanceDetailVo {
    private List<ThreeDimensionResult> resultList;

    public ThreeDimensionInstanceDetailVo(MissionType missionType, InstanceVo instance, List<ThreeDimensionResult> resultList) {
        super(missionType, instance);
        this.resultList = resultList;
    }

    public List<ThreeDimensionResult> getResultList() {
        return resultList;
    }

    public void setResultList(List<ThreeDimensionResult> resultList) {
        this.resultList = resultList;
    }
}
