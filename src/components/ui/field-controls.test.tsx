// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Checkbox } from '@/components/ui/checkbox';
import { Combobox } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/date-picker';
import { DateRangeFilter } from '@/components/ui/date-range-filter';
import {
    Field,
    FieldControl,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/ui/password-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { drainInputOtpTimersSurvivingUnmount } from '../../../tests/fixtures/input-otp';

class ResizeObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
}

beforeAll(() => {
    globalThis.ResizeObserver ??=
        ResizeObserverStub as unknown as typeof ResizeObserver;
});

afterEach(async () => {
    cleanup();
    await drainInputOtpTimersSurvivingUnmount();
});

interface FieldControlCase {
    name: string;
    selector: string;
    control: () => ReactElement;
    wrap?: (control: ReactElement) => ReactElement;
}

const cases: FieldControlCase[] = [
    {
        name: 'an input',
        selector: 'input',
        control: () => <Input />,
    },
    {
        name: 'a textarea',
        selector: 'textarea',
        control: () => <Textarea />,
    },
    {
        name: 'a password input',
        selector: 'input[type="password"]',
        control: () => <PasswordInput />,
    },
    {
        name: 'a switch',
        selector: '[role="switch"]',
        control: () => <Switch />,
    },
    {
        name: 'a checkbox',
        selector: '[role="checkbox"]',
        control: () => <Checkbox />,
    },
    {
        name: 'a radio group',
        selector: '[role="radiogroup"]',
        control: () => (
            <RadioGroup>
                <RadioGroupItem value="one" />
            </RadioGroup>
        ),
    },
    {
        name: 'a select trigger',
        selector: '[role="combobox"]',
        control: () => (
            <SelectTrigger>
                <SelectValue placeholder="Pick one" />
            </SelectTrigger>
        ),
        wrap: (control) => <Select>{control}</Select>,
    },
    {
        name: 'a one time code input',
        selector: 'input[data-input-otp]',
        control: () => (
            <InputOTP maxLength={2}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
            </InputOTP>
        ),
    },
    {
        name: 'a date picker',
        selector: '[data-slot="date-picker-trigger"]',
        control: () => <DatePicker />,
    },
    {
        name: 'a combobox',
        selector: '[data-slot="combobox"]',
        control: () => <Combobox value="" options={[]} onChange={() => {}} />,
    },
    {
        name: 'a date range filter',
        selector: '[data-slot="date-range-filter"]',
        control: () => <DateRangeFilter onChange={() => {}} />,
    },
];

function renderCase({ control, wrap }: FieldControlCase): void {
    const wired = <FieldControl>{control()}</FieldControl>;

    render(
        <Field required error="Pick a departure first">
            <FieldLabel>Departure</FieldLabel>
            <FieldDescription>Tickets open 30 days ahead.</FieldDescription>
            {wrap ? wrap(wired) : wired}
        </Field>,
    );
}

describe('every control the field family accepts', () => {
    it.each(cases)(
        'describes $name with the description and the error',
        (entry) => {
            renderCase(entry);

            const control = document.querySelector(entry.selector);
            const description = document.querySelector(
                '[data-slot="field-description"]',
            );
            const error = document.querySelector('[data-slot="field-error"]');

            expect(control).not.toBeNull();
            expect(control?.getAttribute('aria-describedby')).toBe(
                `${description?.id} ${error?.id}`,
            );
        },
    );

    it.each(cases)('marks $name invalid from the error', (entry) => {
        renderCase(entry);

        expect(
            document
                .querySelector(entry.selector)
                ?.getAttribute('aria-invalid'),
        ).toBe('true');
    });

    it.each(cases)('names $name from the field id', (entry) => {
        renderCase(entry);

        const control = document.querySelector(entry.selector);
        const label = document.querySelector('[data-slot="field-label"]');

        expect(control?.id).not.toBe('');
        expect(label?.getAttribute('for')).toBe(control?.id);
    });
});

describe('an explicit aria-invalid on a control that owns an invalid prop', () => {
    it('wins over the date picker invalid prop', () => {
        render(<DatePicker invalid aria-invalid={false} />);

        expect(
            document
                .querySelector('[data-slot="date-picker-trigger"]')
                ?.getAttribute('aria-invalid'),
        ).toBe('false');
    });

    it('wins over the combobox invalid prop', () => {
        render(
            <Combobox
                invalid
                aria-invalid={false}
                value=""
                options={[]}
                onChange={() => {}}
            />,
        );

        expect(
            document
                .querySelector('[role="combobox"]')
                ?.getAttribute('aria-invalid'),
        ).toBe('false');
    });

    it('leaves the date picker invalid prop in charge on its own', () => {
        render(<DatePicker invalid />);

        expect(
            document
                .querySelector('[data-slot="date-picker-trigger"]')
                ?.getAttribute('aria-invalid'),
        ).toBe('true');
    });

    it('leaves the combobox invalid prop in charge on its own', () => {
        render(<Combobox invalid value="" options={[]} onChange={() => {}} />);

        expect(
            document
                .querySelector('[role="combobox"]')
                ?.getAttribute('aria-invalid'),
        ).toBe('true');
    });
});

describe('a required field', () => {
    it('marks the date picker trigger required for assistive technology', () => {
        renderCase(cases.find((entry) => entry.name === 'a date picker')!);

        expect(
            document
                .querySelector('[data-slot="date-picker-trigger"]')
                ?.getAttribute('aria-required'),
        ).toBe('true');
    });

    it('marks the combobox trigger required for assistive technology', () => {
        renderCase(cases.find((entry) => entry.name === 'a combobox')!);

        expect(
            document
                .querySelector('[role="combobox"]')
                ?.getAttribute('aria-required'),
        ).toBe('true');
    });
});
