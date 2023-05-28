package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.nio.file.attribute.UserPrincipal;
import java.security.Principal;
import java.util.List;


@Controller
@RequestMapping("/admin")
public class MyController {

    @Autowired
    private UserService userService;


    @GetMapping("/api/userForHeader")
    @ResponseBody
    public User userForHeader(Principal principal) {
        if (principal != null) {
            String name = principal.getName();
            return userService.findByUsername(name);
        }
        return null;
    }

    @GetMapping("/api/users")
    @ResponseBody
    public List<User> getAllUsers() {
        return userService.allUsers();
    }


    @GetMapping()
    public String showAllUsers(Model model) {
        model.addAttribute("allUsers", userService.allUsers());
        model.addAttribute("newUser", new User());
        return "all-users";
    }


    @PostMapping("/saveUser")
    public String saveUser(@Valid @ModelAttribute("user") User newUser, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("newUser", newUser);
            model.addAttribute("bindingResult", bindingResult);

            return "all-users";
        }
        userService.saveUser(newUser);

        return "redirect:/admin";
    }


    @PatchMapping("/updateInfo")
    public String updateInfo(@RequestParam("userId") Long id, Model model) {

        User user = userService.findUserById(id);
        model.addAttribute("user", user);

        return "user-update";
    }

    @PatchMapping("/updateUser")
    public String updateUser(@Valid @ModelAttribute("user") User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "user-update";
        }
        userService.updateUser(user);

        return "redirect:/admin";
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam("userId") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
