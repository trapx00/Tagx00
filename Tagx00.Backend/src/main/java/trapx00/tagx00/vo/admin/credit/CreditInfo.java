package trapx00.tagx00.vo.admin.credit;

import trapx00.tagx00.publicdatas.mission.MissionType;

import java.util.HashMap;

public class CreditInfo {
    private int requesterCredits;
    private int workerCredits;
    private int missionCredits;
    private HashMap<MissionType, CreditTypeDistribution> typeDistribution;

    public CreditInfo(int requesterCredits, int workerCredits, int missionCredits, HashMap<MissionType, CreditTypeDistribution> typeDistribution) {
        this.requesterCredits = requesterCredits;
        this.workerCredits = workerCredits;
        this.missionCredits = missionCredits;
        this.typeDistribution = typeDistribution;
    }

    public int getRequesterCredits() {
        return requesterCredits;
    }

    public void setRequesterCredits(int requesterCredits) {
        this.requesterCredits = requesterCredits;
    }

    public int getWorkerCredits() {
        return workerCredits;
    }

    public void setWorkerCredits(int workerCredits) {
        this.workerCredits = workerCredits;
    }

    public int getMissionCredits() {
        return missionCredits;
    }

    public void setMissionCredits(int missionCredits) {
        this.missionCredits = missionCredits;
    }

    public HashMap<MissionType, CreditTypeDistribution> getTypeDistribution() {
        return typeDistribution;
    }

    public void setTypeDistribution(HashMap<MissionType, CreditTypeDistribution> typeDistribution) {
        this.typeDistribution = typeDistribution;
    }
}
