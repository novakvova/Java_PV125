package org.example;

import org.example.entities.User;
import org.example.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static void main(String[] args) {
        SessionFactory sf = HibernateUtil.getSesseionFactory();
        try(Session session = sf.openSession()) {
            Transaction tx = session.beginTransaction();
            User user = new User();
            user.setEmail("novakvova@gmail.com");
            user.setFirstName("Вова");
            user.setLastName("Новак");
            user.setPhone("+38098 34 45 232");
            user.setPassword("123456");
            session.save(user);
            tx.commit();
            System.out.println("User save id = "+ user.getId());
        }
    }
}