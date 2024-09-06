package io.capstone.datum.scheduledTasks;

import io.capstone.datum.services.adminservice.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.scheduling.annotation.Scheduled;

@Component
public class ScheduledTaskDaysLeftNoti {
	@Autowired
	private AdminService adminService;
	
	// Runs at 12:00:01 am every day
	@Scheduled(cron = "1 0 00 * * ?") 
	public void run() {
		adminService.sevenDayNotification();
		adminService.threeDayNotification();
		adminService.oneDayNotification();
	}
}