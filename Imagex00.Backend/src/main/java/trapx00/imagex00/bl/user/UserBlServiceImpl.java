package trapx00.imagex00.bl.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import trapx00.imagex00.blservice.user.UserBlService;
import trapx00.imagex00.dataservice.user.UserDataService;
import trapx00.imagex00.exception.viewexception.SystemException;
import trapx00.imagex00.exception.viewexception.UserAlreadyExistsException;
import trapx00.imagex00.exception.viewexception.WrongUsernameOrPasswordException;
import trapx00.imagex00.util.Convertor;
import trapx00.imagex00.util.JwtUtil;
import trapx00.imagex00.vo.user.UserSaveVo;

import java.util.ArrayList;

@Service
public class UserBlServiceImpl implements UserBlService {

    private final AuthenticationManager authenticationManager;
    private final UserDataService userDataService;
    private final UserDetailsService userDetailsService;

    @Autowired
    public UserBlServiceImpl(UserDataService userDataService, AuthenticationManager authenticationManager, UserDetailsService userDetailsService) {
        this.userDataService = userDataService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    /**
     * sign up
     *
     * @param userSaveVo the user to be registered
     */
    @Override
    public void signUp(UserSaveVo userSaveVo) throws UserAlreadyExistsException, SystemException {
        if (userDataService.isTheUserExists(userSaveVo.getUsername())) {
            throw new UserAlreadyExistsException();
        } else {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            final String rawPassword = userSaveVo.getPassword();
            userSaveVo.setPassword(encoder.encode(rawPassword));

            userDataService.saveUser(Convertor.userSaveVoToUser(userSaveVo));
        }
    }

    @Override
    public String login(String username, String password) throws WrongUsernameOrPasswordException {
        if (userDataService.confirmPassword(username, password)) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            String token = JwtUtil.generateToken(userDetails);
            return token;
        } else {
            throw new WrongUsernameOrPasswordException();
        }
    }
}
