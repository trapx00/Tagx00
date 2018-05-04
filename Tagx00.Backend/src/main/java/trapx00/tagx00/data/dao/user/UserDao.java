package trapx00.tagx00.data.dao.user;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;

import java.util.ArrayList;

@Service
public interface UserDao extends JpaRepository<User, String> {
    User findUserByUsername(String username);

    ArrayList<User> findUsersByRoles(Role role);
}
