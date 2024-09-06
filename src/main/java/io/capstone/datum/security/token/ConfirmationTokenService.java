package io.capstone.datum.security.token;

import lombok.AllArgsConstructor;

import org.json.JSONArray;
import org.springframework.stereotype.Service;

import io.capstone.datum.repositories.ConfirmationTokenRepository;

import java.time.LocalDateTime;
import java.util.Optional;


@Service
@AllArgsConstructor
public class ConfirmationTokenService implements ConfirmationTokenInterfaceService {  

    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }

   //Get count of tokens confirmed before a certain date, with accounts also enabled
   public JSONArray usersJoinedMonth() {

    JSONArray usersJoined = new JSONArray();
    JSONArray lastMonth = new JSONArray();

    //Get count of users over the course of the last 9 months
    for (long i = 0; i < 1; i++) {
        lastMonth.put(LocalDateTime.now().minusMonths(i).getMonth().toString().substring(0, 3));
        usersJoined.put(confirmationTokenRepository.countAllByConfirmedAtBefore(LocalDateTime.now().minusMonths(i-1).withDayOfMonth(1)));
    }

    

    //reverse the order of the months and users joined
    JSONArray reversedUsersJoined = new JSONArray();
    JSONArray reversedLastMonth = new JSONArray();

    for (int i = 0; i < usersJoined.length(); i++) {
        reversedUsersJoined.put(usersJoined.get(usersJoined.length() - i - 1));
        reversedLastMonth.put(lastMonth.get(lastMonth.length() - i - 1));
    }

    JSONArray result = new JSONArray();
    result.put(reversedLastMonth);
    result.put(reversedUsersJoined);

    return result;
}



 //Get count of tokens confirmed before a certain date, with accounts also enabled
 public JSONArray adminsJoinedMonth() {

    JSONArray adminsJoined = new JSONArray();
    JSONArray lastMonth = new JSONArray();

    //Get count of users over the course of the last 9 months
    for (long i = 0; i < 1; i++) {
        lastMonth.put(LocalDateTime.now().minusMonths(i).getMonth().toString().substring(0, 3));
        adminsJoined.put(confirmationTokenRepository.countByConfirmedAtBefore(LocalDateTime.now().minusMonths(i-1).withDayOfMonth(1)));
    }

    

    //reverse the order of the months and users joined
    JSONArray reversedUsersJoined = new JSONArray();
    JSONArray reversedLastMonth = new JSONArray();

    for (int i = 0; i < adminsJoined.length(); i++) {
        reversedUsersJoined.put(adminsJoined.get(adminsJoined.length() - i - 1));
        reversedLastMonth.put(lastMonth.get(lastMonth.length() - i - 1));
    }

    JSONArray result = new JSONArray();
    result.put(reversedLastMonth);
    result.put(reversedUsersJoined);

    return result;
}
   
   
   
    //Get count of tokens confirmed before a certain date
    public JSONArray usersJoined() {

        JSONArray usersJoined = new JSONArray();
        JSONArray lastNineMonths = new JSONArray();

        //Get count of users over the course of the last 9 months
        for (long i = 0; i < 9; i++) {
            lastNineMonths.put(LocalDateTime.now().minusMonths(i).getMonth().toString().substring(0, 3));
            usersJoined.put(confirmationTokenRepository.countAllByConfirmedAtBefore(LocalDateTime.now().minusMonths(i-1).withDayOfMonth(1)));
        }

        

        //reverse the order of the months and users joined
        JSONArray reversedUsersJoined = new JSONArray();
        JSONArray reversedLastNineMonths = new JSONArray();

        for (int i = 0; i < usersJoined.length(); i++) {
            reversedUsersJoined.put(usersJoined.get(usersJoined.length() - i - 1));
            reversedLastNineMonths.put(lastNineMonths.get(lastNineMonths.length() - i - 1));
        }

        JSONArray result = new JSONArray();
        result.put(reversedLastNineMonths);
        result.put(reversedUsersJoined);

        return result;
    }
}
