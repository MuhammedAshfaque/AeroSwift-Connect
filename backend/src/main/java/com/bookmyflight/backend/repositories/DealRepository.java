package com.bookmyflight.backend.repositories;

import com.bookmyflight.backend.models.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {
    @Query("SELECT d FROM Deal d WHERE d.endTime > :currentTime")
    List<Deal> findActiveDeals(LocalDateTime currentTime);
}
