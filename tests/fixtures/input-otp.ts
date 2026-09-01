const INPUT_OTP_LONGEST_UNCLEARED_TIMER_MS = 50;

export function drainInputOtpTimersSurvivingUnmount(): Promise<void> {
    return new Promise((resolve) =>
        setTimeout(resolve, INPUT_OTP_LONGEST_UNCLEARED_TIMER_MS + 10),
    );
}
