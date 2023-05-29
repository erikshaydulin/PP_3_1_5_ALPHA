package ru.kata.spring.boot_security.demo.model;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 2, message = "Имя должно содержать как минимум 2 символа.")
    @Pattern(regexp = "^[a-zA-Zа-яА-Я]+$", message = "Имя не должно содержать цифры, пробелы, спецсимволы")
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Size(min = 2, message = "Фамилия должна содержать как минимум 2 символа.")
    @Pattern(regexp = "^[a-zA-Zа-яА-Я]+$", message = "Фамилия не должно содержать цифры, пробелы, спецсимволы")
    @Column(name = "surname", nullable = false, length = 50)
    private String surname;

    @Column(name = "department")
    private String department;

    @Min(value = 0, message = "Зарплата должна быть не меньше 0")
    @Column(name = "salary")
    private int salary;
    @Column(unique = true)
    private String username;

    private String password;
    @ManyToMany
    @JoinTable(name = "users_roles"
            , joinColumns = @JoinColumn(name = "user_id")
            , inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User() {}

    public User(String name, String surname, String department, int salary, String username, String password, Set<Role> roles) {
        this.name = name;
        this.surname = surname;
        this.department = department;
        this.salary = salary;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public User(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.roles = (Set<Role>) authorities;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    @Override
    public Set<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return salary == user.salary && Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(surname, user.surname) && Objects.equals(department, user.department) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, surname, department, salary, username, password, roles);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", department='" + department + '\'' +
                ", salary=" + salary +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }
}
