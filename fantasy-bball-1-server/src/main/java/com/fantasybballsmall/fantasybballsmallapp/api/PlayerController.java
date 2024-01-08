package com.fantasybballsmall.fantasybballsmallapp.api;

import com.fantasybballsmall.fantasybballsmallapp.exception.PlayerNotFound;
import com.fantasybballsmall.fantasybballsmallapp.model.Player;
import com.fantasybballsmall.fantasybballsmallapp.repository.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
public class PlayerController {

    private final PlayerRepo playerRepo;

    //constructor injection, initialize PlayerRepo object
    @Autowired
    public PlayerController(PlayerRepo playerRepo){
        this.playerRepo = playerRepo;
    }

    //add player to database
    @PostMapping("/player")
    Player addPlayer(@RequestBody Player newPlayer){
        return playerRepo.save(newPlayer);
    }

    //retrieve all players from database
    @GetMapping("/players")
    List<Player> retrievePlayers(){
        return playerRepo.findAll();
    }

    //update player team by id
    @PutMapping("/player/{id}")
    Player updatePlayer(@RequestBody Player newInfo, @PathVariable Long id){
        return playerRepo.findById(id).map(p -> {
                //JSON payload can update either team name or ftps or both
                if(newInfo.getTeam() != null){
                    p.setTeam(newInfo.getTeam());
                }

                if(newInfo.getFtps() != 0.0){
                    p.setFtps(newInfo.getFtps());
                }

                return playerRepo.save(p);
        }).orElseThrow(() -> new PlayerNotFound(id));
    }

    @DeleteMapping("/player/{id}")
    String deletePlayer(@PathVariable Long id){
        if(playerRepo.existsById(id)){
            playerRepo.deleteById(id);
            return "Player " + id + " has been removed from your fantasy team";
        }
        throw new PlayerNotFound(id);
    }

}

