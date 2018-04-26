package trapx00.tagx00.bl.leaderboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trapx00.tagx00.dataservice.account.UserDataService;
import trapx00.tagx00.entity.account.Role;
import trapx00.tagx00.entity.account.User;
import trapx00.tagx00.util.PagingUtil;
import trapx00.tagx00.vo.paging.PagingQueryVo;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class CommonLeaderboardBl<T, U, P> {
    private final UserDataService userDataService;

    @Autowired
    public CommonLeaderboardBl(UserDataService userDataService) {
        this.userDataService = userDataService;
    }

    public T queryLeaderboard(PagingQueryVo pagingQueryVo, Role role, Class<T> returnClass, Method getFieldMethod, Method generateVoMethod) throws InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchFieldException {
        User[] users = userDataService.getUsersByRole(role);
        sortUsers(getFieldMethod, users);
        int startIndex = (pagingQueryVo.getPageNumber() - 1) * pagingQueryVo.getPageSize();
        int endIndex = startIndex + pagingQueryVo.getPageSize();
        ArrayList<P> pArrayList = new ArrayList<>();
        if (users.length >= endIndex) {
            for (int i = startIndex; i < endIndex; i++) {
                User toAddUser = users[i];
                P p = (P) generateVoMethod.invoke(null, toAddUser, i + 1);
                pArrayList.add(p);
            }
        } else {
            for (int i = startIndex; i < users.length; i++) {
                User toAddUser = users[i];
                P p = (P) generateVoMethod.invoke(null, toAddUser, i + 1);
                pArrayList.add(p);
            }
        }

        T t = returnClass.newInstance();
        Field pagingField = returnClass.getDeclaredField("pagingInfoVo");
        pagingField.setAccessible(true);
        pagingField.set(t, PagingUtil.generatePagingInfoVo(pagingQueryVo, users.length));
        Field voField = returnClass.getDeclaredField("users");
        voField.setAccessible(true);
        voField.set(t, pArrayList);
        return t;
    }

    public U querySpecificLeaderboard(String username, Role role, Class<U> returnClass, Method getFieldMethod, Method generateVoMethod) throws InvocationTargetException, IllegalAccessException, NoSuchFieldException, InstantiationException {
        User user = userDataService.getUserByUsername(username);
        User[] users = userDataService.getUsersByRole(role);
        sortUsers(getFieldMethod, users);
        int order = 1;
        for (User user1 : users) {
            if (user1.getUsername().equals(user.getUsername())) {
                break;
            }
            order++;
        }
        U u = returnClass.newInstance();
        Field field = returnClass.getDeclaredField("user");
        field.setAccessible(true);
        field.set(u, generateVoMethod.invoke(null, user, order));
        return u;
    }

    private void sortUsers(Method getFieldMethod, User[] users) {
        Arrays.sort(users, (o1, o2) -> {
            try {
                double element1 = (double) getFieldMethod.invoke(o1);
                double element2 = (double) getFieldMethod.invoke(o2);
                return (int) Math.ceil(element1 - element2);
            } catch (IllegalAccessException | InvocationTargetException e) {
                e.printStackTrace();
            }
            return 0;
        });
    }
}
