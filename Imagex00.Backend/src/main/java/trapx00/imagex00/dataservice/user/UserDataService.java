package trapx00.imagex00.dataservice.user;

import org.springframework.stereotype.Service;
import trapx00.imagex00.entity.user.User;
import trapx00.imagex00.exception.viewexception.SystemException;

@Service
public interface UserDataService {
    /**
     * find whether the user exists
     *
     * @param username the username
     * @return whether the user exists
     */
    boolean isTheUserExists(String username);

    /**
     * save the user
     *
     * @param user the user to be saved
     * @return whether the operation is success or not
     */
    void saveUser(User user) throws SystemException;

    /**
     * confirm the password
     *
     * @param username the username
     * @param password the password
     * @return true if password is correct else false
     */
    boolean confirmPassword(String username, String password);
}
