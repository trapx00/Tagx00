package trapx00.imagex00.blservice.user;

import org.springframework.stereotype.Service;
import trapx00.imagex00.exception.viewexception.SystemException;
import trapx00.imagex00.exception.viewexception.UserAlreadyExistsException;
import trapx00.imagex00.vo.user.UserSaveVo;

@Service
public interface UserBlService {
    /**
     * sign up
     *
     * @param userSaveVo the user to be registered
     */
    void signUp(UserSaveVo userSaveVo) throws UserAlreadyExistsException, SystemException;

}
