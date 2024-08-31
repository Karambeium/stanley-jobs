package com.stanley.stanley_jobs;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User postUser(User newUser) {
        return userRepository.save(newUser); //returns the user object that was passed in
    }

    public User updateUser(int id, User userUpdates) {
        Optional<User> existingUserOpt = userRepository.findById(id);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            if (userUpdates.getUsername() != null) {
                existingUser.setUsername(userUpdates.getUsername());
            }
            if (userUpdates.getPassword() != null) {
                existingUser.setPassword(userUpdates.getPassword());
            }
            if (userUpdates.getType() != null) {
                existingUser.setType(userUpdates.getType());
            }

            return userRepository.save(existingUser);
        } else {
            throw new NoSuchElementException("User not found with id: " + id);
        }
    }

    public void deleteUserById(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("User not found with id: " + id);
        }
    }

    public Optional<User> authenticate(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

}
