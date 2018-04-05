package trapx00.tagx00.exception.viewexception;

import trapx00.tagx00.response.WrongResponse;

public class UnmatchedUsernameAndMissionId extends Exception {
    private WrongResponse response = new WrongResponse(10011, "The username and missionId do not match.");

    public WrongResponse getResponse() {
        return response;
    }
}
