package com.stanley.stanley_jobs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private UserService userService;

    @PostMapping("/register") //any new registration is a candidate by default. Only admin has rights to update them to HM
    public User register(@RequestBody RegisterRequest newRegisterRequest) {

        User newUser = new User();
        newUser.setUsername(newRegisterRequest.getEmail());
        newUser.setPassword(newRegisterRequest.getPassword());
        newUser.setType("Candidate");
        User savedUser = userService.postUser(newUser);

        Candidate newCandidate = new Candidate();
        //TODO: user_id is supposed to be from user table
        newCandidate.setUser_id(savedUser.getId());
        newCandidate.setFull_name(newRegisterRequest.getFull_name());
        newCandidate.setEmail(newRegisterRequest.getEmail());
        newCandidate.setAddress(newRegisterRequest.getAddress());
        newCandidate.setPhone(newRegisterRequest.getPhone());
        newCandidate.setResume(newRegisterRequest.getResume());

        candidateService.registerCandidate(newCandidate);
        return savedUser;

    }

}
