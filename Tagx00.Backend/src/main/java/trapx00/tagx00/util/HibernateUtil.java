package trapx00.tagx00.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class HibernateUtil {

    //读取配置文件，创建SessionFactory和Session    hibernate+mySql
    private HibernateUtil(){
    }
    private static SessionFactory sessionFactory;
    static{
        Configuration cfg = new Configuration();
        cfg.configure();
        ServiceRegistry sr = new StandardServiceRegistryBuilder().applySettings(cfg.getProperties()).build();
        sessionFactory = cfg.buildSessionFactory(sr);
    }
    public static SessionFactory getSeesionFactory(){
        return sessionFactory;
    }
    public static Session getSession(){
        return sessionFactory.openSession();
    }
}
