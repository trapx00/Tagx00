package trapx00.tagx00.response.mission;

import trapx00.tagx00.publicdatas.instance.MissionInstanceState;
import trapx00.tagx00.publicdatas.mission.MissionState;
import trapx00.tagx00.response.Response;

public class MissionStateResponse extends Response {


    int in_progress;
    int submitted;
    int finalized;
    int abandoned;

    public MissionStateResponse() {
    }

    public MissionStateResponse(int in_progress, int submitted, int finalized, int abandoned) {
        this.in_progress = in_progress;
        this.submitted = submitted;
        this.finalized = finalized;
        this.abandoned = abandoned;
    }

    public int getIn_progress() {
        return in_progress;
    }

    public void setIn_progress(int in_progress) {
        this.in_progress = in_progress;
    }

    public int getSubmitted() {
        return submitted;
    }

    public void setSubmitted(int submitted) {
        this.submitted = submitted;
    }

    public int getFinalized() {
        return finalized;
    }

    public void setFinalized(int finalized) {
        this.finalized = finalized;
    }

    public int getAbandoned() {
        return abandoned;
    }

    public void setAbandoned(int abandoned) {
        this.abandoned = abandoned;
    }
}
