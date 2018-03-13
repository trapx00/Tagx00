package trapx00.tagx00.security.jwt;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import trapx00.tagx00.entity.user.User;

import java.util.Date;
import java.util.List;

public interface JwtService {

    Claims getClaimsFromToken(String token);

    String getUsernameFromToken(String token);

    JwtUser convertUserToJwtUser(User user);

    Date generateExpirationDate();

    boolean validateToken(String authToken);

    String generateToken(UserDetails userDetails);
}
