package trapx00.tagx00.blservice.user;

import org.springframework.stereotype.Service;
import trapx00.tagx00.exception.viewexception.SystemException;
import trapx00.tagx00.exception.viewexception.UserAlreadyExistsException;
import trapx00.tagx00.exception.viewexception.WrongUsernameOrPasswordException;
import trapx00.tagx00.vo.user.UserSaveVo;

@Service
public interface UserBlService {
    /**
     * sign up
     *
     * @param userSaveVo the user to be registered
     */
    void signUp(UserSaveVo userSaveVo) throws UserAlreadyExistsException, SystemException;

    String login(String username, String password) throws WrongUsernameOrPasswordException;
}
