package trapx00.imagex00.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import trapx00.imagex00.config.springsecurity.JwtUser;
import trapx00.imagex00.entity.user.User;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtUtil {
    private final static String CLAIM_KEY_USERNAME = "username";
    private final static String CLAIM_KEY_AUTHORITIES = "authorities";

    private final static String SECRET = "123456789";
    private final static long EXPIRATION = 604800;

    public static Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    public static String getUsernameFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return (String) claims.get(CLAIM_KEY_USERNAME);
    }

    public static JwtUser convertUserToJwtUser(User user) {
        return new JwtUser(
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                mapToGrantedAuthorities(user.getRoles())
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<String> roles) {
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }


    private static Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + EXPIRATION * 1000);
    }

    public static boolean validateToken(String authToken) {
        Claims claims = getClaimsFromToken(authToken);
        if (new Date().getTime() > claims.getExpiration().getTime()) {
            return false;
        } else {
            return true;
        }
    }

    public static String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
        claims.put(CLAIM_KEY_AUTHORITIES, userDetails.getAuthorities());
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
}
