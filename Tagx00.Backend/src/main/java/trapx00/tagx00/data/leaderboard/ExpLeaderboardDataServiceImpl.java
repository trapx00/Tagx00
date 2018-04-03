package trapx00.tagx00.data.leaderboard;

import trapx00.tagx00.dataservice.leaderboard.ExpLeaderboardDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;

public class ExpLeaderboardDataServiceImpl implements ExpLeaderboardDataService {
    /**
     * get users by role
     * @param role
     * @return the list of users matching the required role
     */
    @Override
    public User[] getUsersByRole(Role role) {
        return new User[0];
    }
}
