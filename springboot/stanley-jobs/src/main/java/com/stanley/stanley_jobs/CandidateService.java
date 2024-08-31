package com.stanley.stanley_jobs;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public Candidate registerCandidate(Candidate newCandidate) {
        Optional<Candidate> existingCandidate = candidateRepository.findByEmail(newCandidate.getEmail());
        if (existingCandidate.isPresent()) {
            throw new IllegalArgumentException("A candidate with the same email already exists.");
        }

        return candidateRepository.save(newCandidate);
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Optional<Candidate> getCandidateById(int id) {
        return candidateRepository.findById(id);
    }

    public Candidate postCandidate(Candidate newCandidate) {
        return candidateRepository.save(newCandidate);
    }

    public Candidate updateCandidate(int id, Candidate candidateUpdates) {
        Optional<Candidate> existingCandidateOpt = candidateRepository.findById(id);

        if (existingCandidateOpt.isPresent()) {
            Candidate existingCandidate = existingCandidateOpt.get();

            if (candidateUpdates.getFull_name() != null) {
                existingCandidate.setFull_name(candidateUpdates.getFull_name());
            }
            if (candidateUpdates.getEmail() != null) {
                existingCandidate.setEmail(candidateUpdates.getEmail());
            }
            if (candidateUpdates.getAddress() != null) {
                existingCandidate.setAddress(candidateUpdates.getAddress());
            }

            if (candidateUpdates.getPhone() != null) {
                existingCandidate.setPhone(candidateUpdates.getPhone());
            }

            if (candidateUpdates.getResume() != null) {
                existingCandidate.setResume(candidateUpdates.getResume());
            }

            return candidateRepository.save(existingCandidate);
        } else {
            throw new NoSuchElementException("User not found with id: " + id);
        }
    }

    public void deleteCandidateById(int id) {
        if (candidateRepository.existsById(id)) {
            candidateRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("User not found with id: " + id);
        }
    }

}
