package trapx00.tagx00.util;

import org.springframework.security.core.context.SecurityContextHolder;

public class UserInfoUtil {
    public static String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
