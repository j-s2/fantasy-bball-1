package com.fantasybballsmall.fantasybballsmallapp.repository;

import com.fantasybballsmall.fantasybballsmallapp.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepo extends JpaRepository<Player, Long> {
}
