package org.example;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        //if, else, for, while, switch foreach - Копія C#
        Scanner in = new Scanner(System.in);
        System.out.println("Вкажіть значення a");
        int a;
        a = Integer.parseInt(in.nextLine());
        System.out.printf("a=%d",a);
        //System.out.println("Привіт Команда!");
        //System.out.printf("Привіт %dСало%b", 45, false);
    }
}