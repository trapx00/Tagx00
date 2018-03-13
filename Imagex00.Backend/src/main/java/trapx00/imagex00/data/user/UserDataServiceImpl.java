package trapx00.imagex00.data.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import trapx00.imagex00.data.dao.user.UserDao;
import trapx00.imagex00.dataservice.user.UserDataService;
import trapx00.imagex00.entity.user.User;
import trapx00.imagex00.exception.viewexception.SystemException;

@Service
public class UserDataServiceImpl implements UserDataService {
    private final UserDao userDao;

    @Autowired
    public UserDataServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }


    /**
     * find whether the user exists
     *
     * @param username the username
     * @return whether the user exists
     */
    @Override
    public boolean isTheUserExists(String username) {
        return userDao.findUserByUsername(username) != null;
    }

    /**
     * save the user
     *
     * @param user the user to be saved
     */
    @Override
    public void saveUser(User user) throws SystemException {
        if (userDao.save(user) == null) {
            throw new SystemException();
        }
    }

    /**
     * confirm the password
     *
     * @param username the username
     * @param password the password
     * @return true if password is correct else false
     */
    @Override
    public boolean confirmPassword(String username, String password) {
        User user = userDao.findUserByUsername(username);
        if (user != null) {
            if (BCrypt.checkpw(password, user.getPassword())) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }
}
