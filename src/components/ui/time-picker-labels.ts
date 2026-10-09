export interface TimePickerLabels {
    hourLabel: string;
    minuteLabel: string;
    secondLabel: string;
    periodLabel: string;
    amLabel: string;
    pmLabel: string;
    openLabel: string;
    clearLabel: string;
}

export const timePickerDefaultLabels: TimePickerLabels = {
    hourLabel: 'Hours',
    minuteLabel: 'Minutes',
    secondLabel: 'Seconds',
    periodLabel: 'AM/PM',
    amLabel: 'AM',
    pmLabel: 'PM',
    openLabel: 'Choose time',
    clearLabel: 'Clear time',
};

export interface DateTimePickerLabels {
    placeholder: string;
    dateFormat: string;
    clearLabel: string;
}

export const dateTimePickerDefaultLabels: DateTimePickerLabels = {
    placeholder: 'Pick a date and time',
    dateFormat: 'dd MMM yy',
    clearLabel: 'Clear date and time',
};
