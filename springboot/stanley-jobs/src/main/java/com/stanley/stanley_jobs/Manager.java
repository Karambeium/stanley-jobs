package com.stanley.stanley_jobs;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "manager")
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "full_name", length = 50)
    private String fullName;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "department", length = 25)
    private String department;

    @Column(name = "phone", length = 25)
    private String phone;

    // Default constructor
    public Manager() {
        super();
    }

    // Parameterized constructor
    public Manager(int userId, String fullName, String email, String department, String phone) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.department = department;
        this.phone = phone;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
