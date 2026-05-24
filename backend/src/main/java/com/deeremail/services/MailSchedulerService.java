package com.deeremail.services;

import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

import org.quartz.*;
import org.springframework.stereotype.Service;

import com.deeremail.DTOs.ScheduleMailRequest;
import com.deeremail.utils.SendMailJob;

@Service
public class MailSchedulerService {

    private final Scheduler scheduler;

    public MailSchedulerService(Scheduler scheduler) {
        this.scheduler = scheduler;
    }

    public void scheduleMail(ScheduleMailRequest request)
        throws SchedulerException {

        String jobId = UUID.randomUUID().toString();

        JobDataMap dataMap = new JobDataMap();

        dataMap.put("mailRequest", request.getMail());

        JobDetail jobDetail =
            JobBuilder.newJob(SendMailJob.class)
                .withIdentity(jobId)
                .usingJobData(dataMap)
                .build();

        Trigger trigger =
            TriggerBuilder.newTrigger()
                .withIdentity(jobId + "-trigger")
                .startAt(
                    Date.from(
                        request.getSendAt()
                            .atZone(ZoneId.systemDefault())
                            .toInstant()
                    )
                )
                .withSchedule(
                    SimpleScheduleBuilder.simpleSchedule()
                )
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }
}