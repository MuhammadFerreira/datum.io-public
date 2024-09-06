package io.capstone.datum.security.token;

public interface ConfirmationTokenInterfaceService {
    void saveConfirmationToken(ConfirmationToken token);
    int setConfirmedAt(String token);
}
