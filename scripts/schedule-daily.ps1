# Registers (or removes) the Windows scheduled task that refreshes data/jobs.json every day.
#   powershell -ExecutionPolicy Bypass -File scripts\schedule-daily.ps1              # daily at 08:00
#   powershell -ExecutionPolicy Bypass -File scripts\schedule-daily.ps1 -Time 07:30
#   powershell -ExecutionPolicy Bypass -File scripts\schedule-daily.ps1 -Remove
param([string]$Time = '08:00', [switch]$Remove)

$name = 'Career Atlas - daily job update'
if ($Remove) {
  Unregister-ScheduledTask -TaskName $name -Confirm:$false -ErrorAction SilentlyContinue
  Write-Host "Removed scheduled task '$name'."
  return
}

$root = Split-Path -Parent $PSScriptRoot
$node = (Get-Command node -ErrorAction Stop).Source
$action = New-ScheduledTaskAction -Execute $node -Argument "`"$root\scripts\update-jobs.js`"" -WorkingDirectory $root
$trigger = New-ScheduledTaskTrigger -Daily -At $Time
# StartWhenAvailable: if the PC was off or asleep at the scheduled time, run as soon as it is back.
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Hours 1)
Register-ScheduledTask -TaskName $name -Action $action -Trigger $trigger -Settings $settings -Force `
  -Description 'Collects fresher / intern openings and hiring events for Career Atlas into data\jobs.json.' | Out-Null

$task = Get-ScheduledTaskInfo -TaskName $name
Write-Host "Scheduled '$name' daily at $Time (next run: $($task.NextRunTime)). Log: $root\data\update.log"
