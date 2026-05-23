package com.deeremail.DTOs;

import java.util.Map;

public class SendMailRequest {

    private String name;
    private String version;
    private String subject;
    private String sendTo;
    private String[] sendCcTo;
    private Map<String, Object> templateParams;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getSendTo() {
        return sendTo;
    }

    public void setSendTo(String sendTo) {
        this.sendTo = sendTo;
    }

    public String[] getSendCcTo() {
        return sendCcTo;
    }

    public void setSendCcTo(String[] sendCcTo) {
        this.sendCcTo = sendCcTo;
    }

    public Map<String, Object> getTemplateParams() {
        return templateParams;
    }

    public void setTemplateParams(Map<String, Object> templateParams) {
        this.templateParams = templateParams;
    }
}
