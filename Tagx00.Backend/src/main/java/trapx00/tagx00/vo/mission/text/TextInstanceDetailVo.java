package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.entity.mission.instance.workresult.ImageResult;
import trapx00.tagx00.entity.mission.instance.workresult.TextResult;
import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.instance.InstanceDetailVo;
import trapx00.tagx00.vo.mission.instance.InstanceVo;

import java.util.List;

public class TextInstanceDetailVo extends InstanceDetailVo {

    private List<TextResult> textResults;

    public List<TextResult> getTextResults() {
        return textResults;
    }

    public void setImageResults(List<TextResult> textResults) {
        this.textResults = textResults;
    }

    public TextInstanceDetailVo() {

    }

    public TextInstanceDetailVo(MissionType missionType, InstanceVo instance, List<TextResult> textResults) {
        super(missionType, instance);
        this.textResults = textResults;
    }
}