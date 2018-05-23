package trapx00.tagx00.vo.mission.text;

import trapx00.tagx00.publicdatas.mission.MissionType;
import trapx00.tagx00.vo.mission.forpublic.MissionPublicItemVo;

import java.util.Date;
import java.util.List;

public class TextMissionPublicItemVo extends MissionPublicItemVo {

    public List<TextMissionType> missionTypes;

    public TextMissionPublicItemVo() {
    }

    public TextMissionPublicItemVo(String missionId, String title,
                                   String description, MissionType missionType,
                                   Date start, Date end, String coverUrl, int level, int credits, int minimalWorkerLevel, int jobCount,
                                   String requesterUsername, List<TextMissionType> missionTypes) {
        super(missionId, title, description, missionType, start, end, coverUrl, level, credits, minimalWorkerLevel, jobCount, requesterUsername);
        this.missionTypes = missionTypes;
    }

    public List<TextMissionType> getMissionTypes() {
        return missionTypes;
    }

    public void setMissionTypes(List<TextMissionType> missionTypes) {
        this.missionTypes = missionTypes;
    }
}

