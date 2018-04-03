package trapx00.tagx00.data.leaderboard;

import trapx00.tagx00.dataservice.leaderboard.CreditRequesterLeaderboardDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;

public class CreditRequesterLeaderboardDataServiceImpl implements CreditRequesterLeaderboardDataService {

    /**
     * get user by role
     * @param role
     * @return the list of users matching the role
     */
    @Override
    public User[] getUsersByRole(Role role) {
        return new User[0];
    }
}
