package com.deeremail.utils;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import com.deeremail.DTOs.SendMailRequest;
import com.deeremail.services.MailService;

@Component
public class SendMailJob implements Job {

    private final MailService mailService;

    public SendMailJob(MailService mailService) {
        this.mailService = mailService;
    }

    @Override
    public void execute(JobExecutionContext context)
        throws JobExecutionException {

        try {

            SendMailRequest request =
                (SendMailRequest)
                context.getMergedJobDataMap()
                       .get("mailRequest");

            mailService.sendNow(request);

        } catch (Exception e) {

            throw new JobExecutionException(e);
        }
    }
}