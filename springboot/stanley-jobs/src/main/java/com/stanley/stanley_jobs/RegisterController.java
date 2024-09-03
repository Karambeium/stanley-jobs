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
        Candidate newCandidate = new Candidate();
        newCandidate.setUser_id(newRegisterRequest.getUser_id());
        newCandidate.setFull_name(newRegisterRequest.getFull_name());
        newCandidate.setEmail(newRegisterRequest.getEmail());
        newCandidate.setAddress(newRegisterRequest.getAddress());
        newCandidate.setPhone(newRegisterRequest.getPhone());
        newCandidate.setResume(newRegisterRequest.getResume());

        User newUser = new User();
        newUser.setUsername(newRegisterRequest.getEmail());
        newUser.setPassword(newRegisterRequest.getPassword());
        newUser.setType("Candidate");

        candidateService.registerCandidate(newCandidate);
        return userService.postUser(newUser);

    }

}
