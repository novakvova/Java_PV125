package org.example.utils;

import org.example.entities.User;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


public class HibernateUtil {
    private static final SessionFactory sesseionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            Configuration configuration = new Configuration().configure();
            configuration.addAnnotatedClass(User.class);
            return configuration.buildSessionFactory();
        } catch(Throwable ex) {
            System.out.println("Проблема підключення до БД");
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSesseionFactory() {
        return sesseionFactory;
    }
}
