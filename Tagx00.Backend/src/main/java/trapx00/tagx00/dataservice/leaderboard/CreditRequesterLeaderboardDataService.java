package trapx00.tagx00.dataservice.leaderboard;

import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;

public interface CreditRequesterLeaderboardDataService {

    /**
     * get user by role
     * @param role
     * @return the list of users matching the role
     */
    User[] getUsersByRole(Role role);
}
