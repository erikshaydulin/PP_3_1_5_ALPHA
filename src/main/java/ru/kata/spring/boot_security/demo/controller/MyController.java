package ru.kata.spring.boot_security.demo.controller;

import ru.kata.spring.boot_security.demo.model.User;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.service.UserService;



@Controller
@RequestMapping("/admin")
public class MyController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public String showAllUsers(Model model) {

        model.addAttribute("allUsers", userService.allUsers());

        return "all-users";
    }

    @GetMapping("/addNewUser")
    public String addNewUser(Model model) {

        model.addAttribute("user", new User());

        return "user-info";
    }

    @PostMapping("/saveUser")
    public String saveUser(@Valid @ModelAttribute("user") User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            return "user-info";
        }
        userService.saveUser(user);

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
        if (bindingResult.hasErrors()){
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
