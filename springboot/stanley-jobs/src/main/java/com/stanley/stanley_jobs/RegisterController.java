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
    public Candidate register(@RequestBody Candidate newCandidate) {
        //DONE: when register req comes, first check if exisiting email - add to candidate table 
        return candidateService.registerCandidate(newCandidate);

        //TODO: when register req comes - add to user table (username, password (both of these are not being asked during register process!), type=CANDIDATE)
    }

}
