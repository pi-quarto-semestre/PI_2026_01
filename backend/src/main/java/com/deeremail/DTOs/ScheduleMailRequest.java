package com.deeremail.DTOs;

import java.time.LocalDateTime;

public class ScheduleMailRequest {

    private SendMailRequest mail;
    private LocalDateTime sendAt;

    public SendMailRequest getMail() {
        return mail;
    }

    public void setMail(SendMailRequest mail) {
        this.mail = mail;
    }

    public LocalDateTime getSendAt() {
        return sendAt;
    }

    public void setSendAt(LocalDateTime sendAt) {
        this.sendAt = sendAt;
    }
}