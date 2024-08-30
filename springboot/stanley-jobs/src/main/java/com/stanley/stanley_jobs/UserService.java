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

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User postUser(User user) {
        return userRepository.save(user); //returns the user object that was passed in
    }

    public User updateUser(Long id, User userUpdates) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser != null) {
            if (userUpdates.getUsername() != null) {
                existingUser.get().setUsername(userUpdates.getUsername());
            }
            if (userUpdates.getPassword() != null) {
                existingUser.get().setPassword(userUpdates.getPassword());
            }

            if (userUpdates.getType() != null) {
                existingUser.get().setType(userUpdates.getType());
            }

            return userRepository.save(existingUser.get());

        } else {
            throw new NoSuchElementException("User not found with id: " + id);
        }
    }

    public void deleteUserById(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("User not found with id: " + id);
        }

    }

}
