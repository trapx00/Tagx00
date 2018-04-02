package trapx00.tagx00.dataservice.leaderboard;

import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;

public interface ExpLeaderboardDataService {

    /**
     * get users by role
     * @param role
     * @return the list of users matching the required role
     */
    User[] getUsersByRole (Role role);
}
