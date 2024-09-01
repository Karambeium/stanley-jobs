package com.stanley.stanley_jobs;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    public Optional<Manager> getManagerById(int id) {
        return managerRepository.findById(id);
    }

    public Manager postManager(Manager newManager) {
        Optional<Manager> existingManager = managerRepository.findByEmail(newManager.getEmail());

        if (existingManager.isPresent()) {
            throw new IllegalArgumentException("A manager with the same email already exists.");
        }
        return managerRepository.save(newManager);
    }

    public Manager updateManager(int id, Manager managerUpdates) {
        Optional<Manager> existingManagerOpt = managerRepository.findById(id);

        if (existingManagerOpt.isPresent()) {
            Manager existingManager = existingManagerOpt.get();

            if (managerUpdates.getFullName() != null) {
                existingManager.setFullName(managerUpdates.getFullName());
            }
            if (managerUpdates.getEmail() != null) {
                existingManager.setEmail(managerUpdates.getEmail());
            }
            if (managerUpdates.getDepartment() != null) {
                existingManager.setDepartment(managerUpdates.getDepartment());
            }
            if (managerUpdates.getPhone() != null) {
                existingManager.setPhone(managerUpdates.getPhone());
            }

            return managerRepository.save(existingManager);
        } else {
            throw new NoSuchElementException("Manager not found with id: " + id);
        }
    }

    public void deleteManagerById(int id) {
        if (managerRepository.existsById(id)) {
            managerRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("Manager not found with id: " + id);
        }
    }
}
